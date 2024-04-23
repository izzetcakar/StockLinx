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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AccessoryService(
            IRepository<Accessory> repository,
            IAccessoryRepository accessoryRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IDeployedProductRepository deployedProductRepository,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _deployedProductRepository = deployedProductRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<AccessoryDto> GetDto(Guid id)
        {
            var accessory = await GetByIdAsync(id);
            return await _accessoryRepository.GetDto(accessory);
        }

        public async Task<List<AccessoryDto>> GetAllDtos()
        {
            return await _accessoryRepository.GetAllDtos();
        }

        public async Task<AccessoryDto> CreateAccessoryAsync(AccessoryCreateDto createDto)
        {
            var newAccessory = _mapper.Map<Accessory>(createDto);
            newAccessory.Id = Guid.NewGuid();
            newAccessory.CreatedDate = DateTime.UtcNow;
            newAccessory.Quantity = 1;

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
                newAccessory.Id,
                newAccessory.BranchId,
                "Accessory",
                "Branch"
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDto(newAccessory);
        }

        public async Task<List<AccessoryDto>> CreateRangeAccessoryAsync(
            List<AccessoryCreateDto> createDtos
        )
        {
            var newAccessories = new List<Accessory>();
            foreach (var createDto in createDtos)
            {
                var newAccessory = _mapper.Map<Accessory>(createDto);
                newAccessory.Id = Guid.NewGuid();
                newAccessory.CreatedDate = DateTime.UtcNow;
                newAccessory.Quantity = 1;
                newAccessories.Add(newAccessory);
                await _customLogService.CreateCustomLog(
                    "Create",
                    newAccessory.Id,
                    newAccessory.BranchId,
                    "Accessory",
                    "Branch"
                );
            }
            await _accessoryRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDtos(newAccessories);
        }

        public async Task<AccessoryDto> UpdateAccessoryAsync(AccessoryUpdateDto updateDto)
        {
            var accessoryInDb = await GetByIdAsync(updateDto.Id);
            if (accessoryInDb == null)
            {
                throw new ArgumentNullException("Accessory is not found");
            }
            var updatedAccessory = _mapper.Map<Accessory>(updateDto);
            updatedAccessory.UpdatedDate = DateTime.UtcNow;

            if (updatedAccessory.ImagePath != null)
            {
                if (updatedAccessory.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(
                        updatedAccessory.ImagePath,
                        $"{updatedAccessory.Id}",
                        "Accessories"
                    );
                    updatedAccessory.ImagePath = $"Accessories/{updatedAccessory.Id}.jpg";
                }
            }

            _accessoryRepository.Update(accessoryInDb, updatedAccessory);
            await _customLogService.CreateCustomLog(
                "Update",
                updatedAccessory.Id,
                updatedAccessory.BranchId,
                "Accessory",
                "Branch"
            );
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDto(updatedAccessory);
        }

        public async Task DeleteAccessoryAsync(Guid accessoryId)
        {
            var accessory = await GetByIdAsync(accessoryId);
            if (accessory == null)
            {
                throw new ArgumentNullException("Accessory is not found");
            }

            _accessoryRepository.Update(accessory, accessory);
            await _customLogService.CreateCustomLog(
                "Delete",
                accessory.Id,
                accessory.BranchId,
                "Accessory",
                "Branch"
            );
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAccessoryAsync(List<Guid> accessoryIds)
        {
            var accessories = new List<Accessory>();
            foreach (var accessoryId in accessoryIds)
            {
                var accessory = await GetByIdAsync(accessoryId);
                if (accessory == null)
                {
                    throw new ArgumentNullException($"{accessoryId} - Accessory is not found");
                }
                accessories.Add(accessory);
            }
            foreach (var accessory in accessories)
            {
                _accessoryRepository.Update(accessory, accessory);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    accessory.Id,
                    accessory.BranchId,
                    "Accessory",
                    "Branch"
                );
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<AccessoryCheckInResponseDto> CheckIn(AccessoryCheckInDto checkInDto)
        {
            var accessory = await _accessoryRepository.GetByIdAsync(checkInDto.AccessoryId);
            if (accessory == null)
            {
                throw new Exception("Accessory not found");
            }
            var deployedProducts = await _deployedProductRepository.GetAll().ToListAsync();
            var availableQuantity =
                accessory.Quantity
                - deployedProducts.Count(d =>
                    d.AccessoryId.HasValue && d.AccessoryId == accessory.Id
                );
            if (availableQuantity < 1)
            {
                throw new Exception("Accessory is out of stock");
            }
            var deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                AccessoryId = accessory.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                accessory.Id,
                deployedProduct.UserId,
                "Accessory",
                "User"
            );
            await _unitOfWork.CommitAsync();
            var accessoryDto = await _accessoryRepository.GetDto(accessory);
            var deployedProductDto = await _deployedProductRepository.GetDto(deployedProduct);
            return new AccessoryCheckInResponseDto
            {
                Accessory = accessoryDto,
                DeployedProduct = deployedProductDto
            };
        }

        public async Task<AccessoryDto> CheckOut(Guid id)
        {
            var deployedProduct = await _deployedProductRepository.GetByIdAsync(id);
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            var accessory = await _accessoryRepository.GetByIdAsync(deployedProduct.AccessoryId);
            if (accessory == null)
            {
                throw new Exception("Accessory is not found");
            }
            _deployedProductRepository.Update(deployedProduct, deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckOut",
                accessory.Id,
                accessory.BranchId,
                "Accessory",
                "Branch"
            );
            await _unitOfWork.CommitAsync();
            var accessoryDto = await _accessoryRepository.GetDto(accessory);
            return accessoryDto;
        }
    }
}
