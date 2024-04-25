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
    public class AccessoryService : Service<Accessory>, IAccessoryService
    {
        private readonly IAccessoryRepository _accessoryRepository;
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccessoryService(
            IRepository<Accessory> repository,
            IAccessoryRepository accessoryRepository,
            IBranchRepository branchRepository,
            IDeployedProductRepository deployedProductRepository,
            ICustomLogService customLogService,
            IUserService userService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _deployedProductRepository = deployedProductRepository;
            _branchRepository = branchRepository;
            _customLogService = customLogService;
            _userService = userService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<AccessoryDto> GetDto(Guid id)
        {
            Accessory accessory = await GetByIdAsync(id);
            if (accessory == null)
            {
                throw new Exception("Accessory is not found");
            }
            return await _accessoryRepository.GetDtoAsync(accessory);
        }

        public async Task<List<AccessoryDto>> GetAllDtos()
        {
            return await _accessoryRepository.GetAllDtosAsync();
        }

        public async Task<AccessoryDto> CreateAccessoryAsync(AccessoryCreateDto dto)
        {
            Branch branch = await _branchRepository.GetByIdAsync(dto.BranchId);
            Accessory newAccessory = _mapper.Map<Accessory>(dto);
            newAccessory.Id = Guid.NewGuid();
            newAccessory.CreatedDate = DateTime.UtcNow;

            if (newAccessory.ImagePath != null)
            {
                if (newAccessory.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(
                        newAccessory.ImagePath,
                        $"{newAccessory.Id}",
                        "Accessories"
                    );
                    newAccessory.ImagePath = $"Accessories/{newAccessory.Id}.jpg";
                }
            }

            await _accessoryRepository.AddAsync(newAccessory);
            await _customLogService.CreateCustomLog(
                "Create",
                "Accessory",
                newAccessory.Id,
                newAccessory.Name,
                "Branch",
                branch.Id,
                branch.Name
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(newAccessory);
        }

        public async Task<List<AccessoryDto>> CreateRangeAccessoryAsync(
            List<AccessoryCreateDto> dtos
        )
        {
            Branch branch = await _branchRepository.GetByIdAsync(dtos[0].BranchId);
            List<Accessory> newAccessories = new List<Accessory>();
            foreach (AccessoryCreateDto dto in dtos)
            {
                Accessory newAccessory = _mapper.Map<Accessory>(dto);
                newAccessory.Id = Guid.NewGuid();
                newAccessory.CreatedDate = DateTime.UtcNow;
                newAccessory.Quantity = 1;
                newAccessories.Add(newAccessory);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Accessory",
                    newAccessory.Id,
                    newAccessory.Name,
                    "Branch",
                    branch.Id,
                    branch.Name
                );
            }
            await _accessoryRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtosAsync(newAccessories);
        }

        public async Task<AccessoryDto> UpdateAccessoryAsync(AccessoryUpdateDto dto)
        {
            Accessory accessoryInDb = await GetByIdAsync(dto.Id);
            if (accessoryInDb == null)
            {
                throw new Exception("Accessory is not found");
            }
            Accessory accessory = _mapper.Map<Accessory>(dto);
            accessory.UpdatedDate = DateTime.UtcNow;

            if (accessory.ImagePath != null)
            {
                if (accessory.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(
                        accessory.ImagePath,
                        $"{accessory.Id}",
                        "Accessories"
                    );
                    accessory.ImagePath = $"Accessories/{accessory.Id}.jpg";
                }
            }

            _accessoryRepository.Update(accessoryInDb, accessory);
            await _customLogService.CreateCustomLog(
                "Update",
                "Accessory",
                accessory.Id,
                accessory.Name
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtoAsync(accessory);
        }

        public async Task DeleteAccessoryAsync(Guid id)
        {
            Accessory accessory = await GetByIdAsync(id);
            if (accessory == null)
            {
                throw new Exception("Accessory is not found");
            }

            bool canDelete = await _accessoryRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Accessory",
                    accessory.Id,
                    accessory.Name
                );
                _accessoryRepository.Remove(accessory);
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAccessoryAsync(List<Guid> ids)
        {
            List<Accessory> accessories = new List<Accessory>();
            foreach (Guid id in ids)
            {
                Accessory accessory = await GetByIdAsync(id);
                if (accessory == null)
                {
                    throw new Exception("Accessory is not found");
                }
                accessories.Add(accessory);
            }
            foreach (Accessory accessory in accessories)
            {
                bool canDelete = await _accessoryRepository.CanDeleteAsync(accessory.Id);
                if (canDelete)
                {
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Accessory",
                        accessory.Id,
                        accessory.Name
                    );
                    _accessoryRepository.Remove(accessory);
                }
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<DeployedProductDto> CheckIn(ProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            Accessory accessory = await GetByIdAsync(checkInDto.ProductId);
            if (accessory == null)
            {
                throw new Exception("Accessory not found");
            }
            int availableQuantity = await _accessoryRepository.GetAvaliableQuantityAsync(accessory);
            if (availableQuantity < 1)
            {
                throw new Exception("Accessory is out of stock");
            }
            if (checkInDto.Quantity < availableQuantity)
            {
                throw new Exception("Accessory stock is not enough");
            }
            DeployedProduct deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                AccessoryId = accessory.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = availableQuantity,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Accessory",
                accessory.Id,
                accessory.Name,
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

        public async Task CheckOut(Guid id)
        {
            Accessory accessory = await GetByIdAsync(id);
            if (accessory == null)
            {
                throw new Exception("Accessory is not found");
            }
            List<DeployedProduct> deployedProducts = await _deployedProductRepository
                .GetAll()
                .Where(dp => dp.AccessoryId == id)
                .ToListAsync();
            var deployedProduct = deployedProducts.Find(dp => dp.AccessoryId == id);
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            _deployedProductRepository.Remove(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckOut",
                "Accessory",
                accessory.Id,
                deployedProduct.Accessory.Name
            );
            await _unitOfWork.CommitAsync();
        }
    }
}
