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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<AccessoryService> _logger;
        public AccessoryService(IRepository<Accessory> repository, IAccessoryRepository accessoryRepository, IUnitOfWork unitOfWork,
            IMapper mapper, ILogger<AccessoryService> logger, IDeployedProductRepository deployedProductRepository) : base(repository, unitOfWork)
        {
            _accessoryRepository = accessoryRepository;
            _deployedProductRepository = deployedProductRepository;
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
            var addedAccessory = await AddAsync(newAccessory);
            return await _accessoryRepository.GetDto(addedAccessory);
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
            }
            var addedAccessories = await AddRangeAsync(newAccessories);
            return await _accessoryRepository.GetDtos(addedAccessories.ToList());
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
            await UpdateAsync(accessoryInDb, updatedAccessory);
            var accessory = await GetByIdAsync(updateDto.Id);
            return await _accessoryRepository.GetDto(accessory);
        }

        public async Task DeleteAccessoryAsync(Guid accessoryId)
        {
            if (accessoryId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(accessoryId), "The ID of the accessory to delete is null.");
            }
            var accessory = await GetByIdAsync(accessoryId);
            if (accessory == null)
            {
                throw new ArgumentNullException(nameof(accessory), "The accessory to delete is null.");
            }
            await RemoveAsync(accessory);
        }

        public async Task DeleteRangeAccessoryAsync(List<Guid> accessoryIds)
        {
            var accessories = new List<Accessory>();
            foreach (var accessoryId in accessoryIds)
            {
                var accessory = GetByIdAsync(accessoryId).Result;
                accessories.Add(accessory);
            }
            await RemoveRangeAsync(accessories);
        }

        public async Task<AccessoryCheckInResponseDto> CheckIn(AccessoryCheckInDto checkInDto)
        {
            try
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
                var accessoryDto = await _accessoryRepository.GetDto(accessory);
                var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
                await _unitOfWork.CommitAsync();
                return new AccessoryCheckInResponseDto
                {
                    Accessory = accessoryDto,
                    DeployedProduct = deployedProductDto
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AccessoryDto> CheckOut(Guid id)
        {
            try
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
                _deployedProductRepository.Remove(deployedProduct);
                var accessoryDto = await _accessoryRepository.GetDto(accessory);
                await _unitOfWork.CommitAsync();
                return accessoryDto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
