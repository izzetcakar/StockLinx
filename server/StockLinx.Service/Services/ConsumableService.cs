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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ConsumableService(IRepository<Consumable> repository, IConsumableRepository consumableRepository, IUnitOfWork unitOfWork,
             IMapper mapper, IDeployedProductRepository deployedProductRepository, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _consumableRepository = consumableRepository;
            _deployedProductRepository = deployedProductRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsumableDto> GetDto(Guid id)
        {
            var consumable = await GetByIdAsync(id);
            return await _consumableRepository.GetDto(consumable);
        }

        public async Task<List<ConsumableDto>> GetAllDtos()
        {
            return await _consumableRepository.GetAllDtos();
        }

        public async Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto createDto)
        {
            var newConsumable = _mapper.Map<Consumable>(createDto);
            newConsumable.Id = Guid.NewGuid();
            newConsumable.CreatedDate = DateTime.UtcNow;
            await _consumableRepository.AddAsync(newConsumable);
            await _customLogService.CreateCustomLog("Create", newConsumable.Id, newConsumable.BranchId, "Consumable", "Branch");
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDto(newConsumable);
        }

        public async Task<List<ConsumableDto>> CreateRangeConsumableAsync(List<ConsumableCreateDto> createDtos)
        {
            var newConsumables = new List<Consumable>();
            foreach (var createDto in createDtos)
            {
                var newConsumable = _mapper.Map<Consumable>(createDto);
                newConsumable.Id = Guid.NewGuid();
                newConsumable.CreatedDate = DateTime.UtcNow;
                newConsumables.Add(newConsumable);
                await _customLogService.CreateCustomLog("Create", newConsumable.Id, newConsumable.BranchId, "Consumable", "Branch");
            }
            await _consumableRepository.AddRangeAsync(newConsumables);
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDtos(newConsumables);
        }

        public async Task<ConsumableDto> UpdateConsumableAsync(ConsumableUpdateDto updateDto)
        {
            var consumableInDb = await GetByIdAsync(updateDto.Id);
            if (consumableInDb == null)
            {
                throw new ArgumentNullException("Consumable is not found");
            }
            var updatedConsumable = _mapper.Map<Consumable>(updateDto);
            updatedConsumable.UpdatedDate = DateTime.UtcNow;
            _consumableRepository.Update(consumableInDb, updatedConsumable);
            await _customLogService.CreateCustomLog("Update", consumableInDb.Id, consumableInDb.BranchId, "Consumable", "Branch");
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDto(updatedConsumable);
        }

        public async Task DeleteConsumableAsync(Guid consumableId)
        {
            var consumable = await GetByIdAsync(consumableId);
            if (consumable == null)
            {
                throw new ArgumentNullException("Consumable is not found");
            }
            consumable.DeletedDate = DateTime.UtcNow;
            _consumableRepository.Update(consumable, consumable);
            await _customLogService.CreateCustomLog("Delete", consumable.Id, consumable.BranchId, "Consumable", "Branch");
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeConsumableAsync(List<Guid> consumableIds)
        {
            var consumables = new List<Consumable>();
            foreach (var consumableId in consumableIds)
            {
                var consumable = await GetByIdAsync(consumableId);
                if (consumable == null)
                {
                    throw new ArgumentNullException($"{consumableId} - Consumable is not found");
                }
                consumable.DeletedDate = DateTime.UtcNow;
                consumables.Add(consumable);
                await _customLogService.CreateCustomLog("Delete", consumable.Id, consumable.BranchId, "Consumable", "Branch");
            }
            _consumableRepository.UpdateRange(consumables);
            await _unitOfWork.CommitAsync();
        }

        public async Task<ConsumableCheckInResponseDto> CheckIn(ConsumableCheckInDto checkInDto)
        {
            var consumable = await _consumableRepository.GetByIdAsync(checkInDto.ConsumableId);
            if (consumable == null)
            {
                throw new Exception("Consumable is not found");
            }
            var deployedProducts = await _deployedProductRepository.GetAll().ToListAsync();
            var availableQuantity = consumable.Quantity - deployedProducts.Count(d => d.ConsumableId.HasValue && d.ConsumableId == consumable.Id);
            if (availableQuantity < 1)
            {
                throw new Exception("Consumable is out of stock");
            }
            var deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                ConsumableId = checkInDto.ConsumableId,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog("CheckIn", consumable.Id, deployedProduct.UserId, "Consumable", "User");
            await _unitOfWork.CommitAsync();
            var consumableDto = await _consumableRepository.GetDto(consumable);
            var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
            return new ConsumableCheckInResponseDto
            {
                Consumable = consumableDto,
                DeployedProduct = deployedProductDto
            };
        }

        public async Task<ConsumableDto> CheckOut(Guid id)
        {
            var deployedProduct = await _deployedProductRepository.Where(d => d.ConsumableId.HasValue && d.Id == id).SingleOrDefaultAsync();
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            var consumable = await _consumableRepository.GetByIdAsync(deployedProduct.ConsumableId);
            if (consumable == null)
            {
                throw new Exception("Consumable is not found");
            }
            deployedProduct.DeletedDate = DateTime.UtcNow;
            _deployedProductRepository.Update(deployedProduct, deployedProduct);
            await _customLogService.CreateCustomLog("CheckOut", consumable.Id, consumable.BranchId, "Consumable", "Branch");
            await _unitOfWork.CommitAsync();
            return await _consumableRepository.GetDto(consumable);
        }
    }
}
