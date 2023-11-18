using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAccessoryRepository _accessoryRepository;
        private readonly ILogger<AccessoryService> _logger;
        public AccessoryService(IRepository<Accessory> repository, IAccessoryRepository accessoryRepository
            , IUnitOfWork unitOfWork, IMapper mapper, ILogger<AccessoryService> logger) : base(repository, unitOfWork)
        {
            _mapper = mapper;
            _accessoryRepository = accessoryRepository;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }
        public async Task<List<AccessoryDto>> GetAccessoryDtos()
        {
            var accessories = await _accessoryRepository.GetAll().Include(x => x.Branch)
             .Select(x => new AccessoryDto
             {
                 Id = x.Id,
                 CompanyId = x.Branch.CompanyId,
                 BranchId = x.BranchId,
                 CategoryId = x.CategoryId,
                 ProductStatusId = x.ProductStatusId,
                 Name = x.Name,
                 ImagePath = x.ImagePath,
                 SerialNo = x.SerialNo,
                 OrderNo = x.OrderNo,
                 Notes = x.Notes,
                 PurchaseDate = x.PurchaseDate,
                 PurchaseCost = x.PurchaseCost,
                 CheckinCounter = x.CheckinCounter,
                 CheckoutCounter = x.CheckoutCounter,
                 ManufacturerId = x.ManufacturerId,
                 SupplierId = x.SupplierId,
                 ModelNo = x.ModelNo,
                 Quantity = x.Quantity,
                 WarrantyDate = x.WarrantyDate,
             }).ToListAsync();
            return accessories;
        }
        public async Task CreateAccessoryAsync(AccessoryCreateDto createDto)
        {
            var newAccessory = _mapper.Map<Accessory>(createDto);
            newAccessory.Id = Guid.NewGuid();
            newAccessory.CreatedDate = DateTime.UtcNow;
            await AddAsync(newAccessory);
        }

        public async Task CreateRangeAccessoryAsync(List<AccessoryCreateDto> createDtos)
        {
            var newAccessories = new List<Accessory>();
            foreach (var createDto in createDtos)
            {
                var newAccessory = _mapper.Map<Accessory>(createDto);
                newAccessory.Id = Guid.NewGuid();
                newAccessory.CreatedDate = DateTime.UtcNow;
                newAccessories.Add(newAccessory);
            }
            await AddRangeAsync(newAccessories);
        }

        public async Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto)
        {
            var accessoryInDb = await GetByIdAsync(updateDto.Id);
            if (accessoryInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the accessory to update is null.");
            }
            var updatedAccessory = _mapper.Map<Accessory>(updateDto);
            updatedAccessory.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(accessoryInDb, updatedAccessory);
            await _unitOfWork.CommitAsync();
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
        public async Task<ProductCounter> GetAllCountAsync()
        {
            var accessories = await GetAllAsync();
            var accessoryCount = accessories.Count();
            return new ProductCounter { EntityName = "Accessories", Count = accessoryCount };
        }

        public async Task<List<ProductStatusCounter>> GetStatusCount()
        {
            var accessories = await _accessoryRepository.GetAll().Include(x => x.ProductStatus).ToListAsync();
            var productStatusCounts = accessories
                .Where(accessory => accessory.ProductStatus != null)
                .GroupBy(accessory => accessory.ProductStatus.Type)
                .Select(group => new ProductStatusCounter
                {
                    Status = group.Key.ToString(),
                    Count = group.Count()
                })
                .ToList();

            return productStatusCounts;
        }
    }
}
