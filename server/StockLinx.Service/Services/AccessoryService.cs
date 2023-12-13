using AutoMapper;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger<AccessoryService> _logger;
        public AccessoryService(IRepository<Accessory> repository, IAccessoryRepository accessoryRepository, IUnitOfWork unitOfWork,
            IMapper mapper, ILogger<AccessoryService> logger, IDeployedProductRepository deployedProductRepository,
            ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _deployedProductRepository = deployedProductRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _logger = logger;
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
            await _accessoryRepository.AddAsync(newAccessory);
            await _customLogService.CreateCustomLog("Create", newAccessory.Id, newAccessory.BranchId, "Accessory", "Branch");
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDto(newAccessory);
        }

        public async Task<List<AccessoryDto>> CreateRangeAccessoryAsync(List<AccessoryCreateDto> createDtos)
        {
            var newAccessories = new List<Accessory>();
            foreach (var createDto in createDtos)
            {
                var newAccessory = _mapper.Map<Accessory>(createDto);
                newAccessory.Id = Guid.NewGuid();
                newAccessory.CreatedDate = DateTime.UtcNow;
                newAccessories.Add(newAccessory);
                await _customLogService.CreateCustomLog("Create", newAccessory.Id, newAccessory.BranchId, "Accessory", "Branch");
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
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the accessory to update is null.");
            }
            var updatedAccessory = _mapper.Map<Accessory>(updateDto);
            updatedAccessory.UpdatedDate = DateTime.UtcNow;
            _accessoryRepository.Update(accessoryInDb, updatedAccessory);
            await _customLogService.CreateCustomLog("Update", updatedAccessory.Id, null, "Accessory", null);
            await _unitOfWork.CommitAsync();
            return await _accessoryRepository.GetDto(updatedAccessory);
        }

        public async Task DeleteAccessoryAsync(Guid accessoryId)
        {
            var accessory = await GetByIdAsync(accessoryId);
            if (accessory == null)
            {
                throw new ArgumentNullException(nameof(accessory), "Accessory is not found");
            }
            accessory.DeletedDate = DateTime.UtcNow;
            _accessoryRepository.Update(accessory, accessory);
            await _customLogService.CreateCustomLog("Delete", accessory.Id, null, "Accessory", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAccessoryAsync(List<Guid> accessoryIds)
        {
            var accessories = new List<Accessory>();
            foreach (var accessoryId in accessoryIds)
            {
                var accessory = await GetByIdAsync(accessoryId);
                accessories.Add(accessory);
            }
            foreach (var accessory in accessories)
            {
                accessory.DeletedDate = DateTime.UtcNow;
                _accessoryRepository.Update(accessory, accessory);
                await _customLogService.CreateCustomLog("Delete", accessory.Id, null, "Accessory", null);
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
            var deployedProducts = _deployedProductRepository.GetAll();
            var availableQuantity = accessory.Quantity - deployedProducts.Count(d => d.AccessoryId.HasValue && d.AccessoryId == accessory.Id);
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
            await _customLogService.CreateCustomLog("CheckIn", accessory.Id, deployedProduct.UserId, "Accessory", "User");
            await _unitOfWork.CommitAsync();
            var accessoryDto = await _accessoryRepository.GetDto(accessory);
            var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
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
            deployedProduct.DeletedDate = DateTime.UtcNow;
            _deployedProductRepository.Update(deployedProduct, deployedProduct);
            await _customLogService.CreateCustomLog("CheckOut", accessory.Id, null, "Accessory", null);
            await _unitOfWork.CommitAsync();
            var accessoryDto = await _accessoryRepository.GetDto(accessory);
            return accessoryDto;
        }
    }
}
