using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        private readonly IConsumableRepository _consumableRepository;
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ConsumableService(
            IRepository<Consumable> repository,
            IConsumableRepository consumableRepository,
            IDeployedProductRepository deployedProductRepository,
            IBranchRepository branchRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _deployedProductRepository = deployedProductRepository;
            _branchRepository = branchRepository;
            _userService = userService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsumableDto> GetDtoAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            if (consumable == null)
            {
                throw new Exception("Consumable is not found");
            }
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task<List<ConsumableDto>> GetAllDtosAsync()
        {
            return await _consumableRepository.GetAllDtosAsync();
        }

        public async Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto dto)
        {
            Consumable consumable = _mapper.Map<Consumable>(dto);
            consumable.Id = Guid.NewGuid();
            consumable.CreatedDate = DateTime.UtcNow;
            await _consumableRepository.AddAsync(consumable);
            await _customLogService.CreateCustomLog(
                "Create",
                "Consumable",
                consumable.Id,
                consumable.Name
            );
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task<List<ConsumableDto>> CreateRangeConsumableAsync(
            List<ConsumableCreateDto> createDtos
        )
        {
            List<Consumable> consumables = new List<Consumable>();
            foreach (ConsumableCreateDto createDto in createDtos)
            {
                Consumable consumable = _mapper.Map<Consumable>(createDto);
                consumable.Id = Guid.NewGuid();
                consumable.CreatedDate = DateTime.UtcNow;
                consumables.Add(consumable);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Consumable",
                    consumable.Id,
                    consumable.Name
                );
            }
            await _consumableRepository.AddRangeAsync(consumables);
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtosAsync(consumables);
        }

        public async Task<ConsumableDto> UpdateConsumableAsync(ConsumableUpdateDto dto)
        {
            Consumable consumableInDb = await GetByIdAsync(dto.Id);
            if (consumableInDb == null)
            {
                throw new Exception("Consumable is not found");
            }
            Consumable consumable = _mapper.Map<Consumable>(dto);
            consumable.UpdatedDate = DateTime.UtcNow;
            _consumableRepository.Update(consumableInDb, consumable);
            await _customLogService.CreateCustomLog(
                "Update",
                "Consumable",
                consumable.Id,
                consumable.Name
            );
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtoAsync(consumable);
        }

        public async Task DeleteConsumableAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            if (consumable == null)
            {
                throw new Exception("Consumable is not found");
            }
            bool canDelete = await _consumableRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                _consumableRepository.Remove(consumable);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Consumable",
                    consumable.Id,
                    consumable.Name
                );
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeConsumableAsync(List<Guid> ids)
        {
            List<Consumable> consumables = new List<Consumable>();
            foreach (Guid id in ids)
            {
                Consumable consumable = await GetByIdAsync(id);
                if (consumable == null)
                {
                    throw new Exception($"{id} - Consumable is not found");
                }
                bool canDelete = await _consumableRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    consumables.Add(consumable);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Consumable",
                        consumable.Id,
                        consumable.Name
                    );
                }
            }
            _consumableRepository.RemoveRange(consumables);
            await _unitOfWork.CommitAsync();
        }

        public async Task<DeployedProductDto> CheckInAsync(ProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            Consumable consumable = await GetByIdAsync(checkInDto.ProductId);
            if (consumable == null)
            {
                throw new Exception("Consumable not found");
            }
            int availableQuantity = await _consumableRepository.GetAvaliableQuantityAsync(
                consumable
            );
            if (availableQuantity < 1)
            {
                throw new Exception("Consumable is out of stock");
            }
            if (checkInDto.Quantity < availableQuantity)
            {
                throw new Exception("Consumable stock is not enough");
            }
            DeployedProduct deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                ConsumableId = consumable.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = availableQuantity,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Consumable",
                consumable.Id,
                consumable.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName
            );
            await _unitOfWork.CommitAsync();
            DeployedProductDto deployedProductDto = await _deployedProductRepository.GetDtoAsync(
                deployedProduct
            );
            return deployedProductDto;
        }

        public async Task CheckOutAsync(Guid id)
        {
            Consumable consumable = await GetByIdAsync(id);
            if (consumable == null)
            {
                throw new Exception("Consumable is not found");
            }
            List<DeployedProduct> deployedProducts = await _deployedProductRepository
                .GetAll()
                .Where(dp => dp.ConsumableId == id)
                .ToListAsync();
            var deployedProduct = deployedProducts.Find(dp => dp.ConsumableId == id);
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            _deployedProductRepository.Remove(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckOut",
                "Consumable",
                consumable.Id,
                deployedProduct.Consumable.Name
            );
            await _unitOfWork.CommitAsync();
        }
    }
}
