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
using StockLinx.Repository.Repositories.EF_Core;

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
            if (createDto == null)
            {
                throw new ArgumentNullException(nameof(createDto), "The accessory create DTO is null.");
            }
            try
            {
                var newAccessory = _mapper.Map<Accessory>(createDto);
                var accessoryId = Guid.NewGuid();
                newAccessory.Id = accessoryId;
                newAccessory.CreatedDate = DateTime.UtcNow;
                if (createDto.ImagePath != null)
                {
                    string fileName = $"Accessory - {newAccessory.Name} - {DateTime.UtcNow}";
                    ImageHandler.UploadBase64AsFile(createDto.ImagePath, fileName);
                    newAccessory.ImagePath = fileName;
                }
                await _accessoryRepository.AddAsync(newAccessory);
                await _unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the accessory.");
                throw;
            }
        }
        public async Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto)
        {
            try
            {
                var accessoryId = updateDto?.Id;
                if (accessoryId == null)
                {
                    throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the accessory to update is null.");
                }

                var accessoryInDb = await GetByIdAsync((Guid)accessoryId);
                var updatedAccessory = _mapper.Map<Accessory>(updateDto);
                updatedAccessory.UpdatedDate = DateTime.UtcNow;
                _accessoryRepository.Update(accessoryInDb, updatedAccessory);

                if (updateDto?.ImagePath != null)
                {
                    string fileName = $"Accessory - {updatedAccessory.Name} - {DateTime.UtcNow}";
                    ImageHandler.UploadBase64AsFile(updateDto.ImagePath, fileName);
                    updatedAccessory.ImagePath = fileName;
                }

                await _unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the accessory.");
                throw;
            }
        }
        public async Task DeleteAccessoryAsync(Guid accessoryId)
        {
            var accessoryInDb = await GetByIdAsync(accessoryId);
            if (accessoryInDb == null)
            {
                throw new ArgumentNullException(nameof(accessoryId), "The ID of the accessory to delete is null.");
            }
            await RemoveAsync(accessoryInDb);
            await _unitOfWork.CommitAsync();
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
