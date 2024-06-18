using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class UserProductRepository : Repository<UserProduct>, IUserProductRepository
    {
        private readonly IMapper _mapper;
        private readonly IAccessoryRepository _accessoryRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IConsumableRepository _consumableRepository;
        private readonly ILicenseRepository _licenseRepository;
        public UserProductRepository(AppDbContext dbContext, IMapper mapper, IAccessoryRepository accessoryRepository,
            IAssetRepository assetRepository, IConsumableRepository consumableRepository, ILicenseRepository licenseRepository) : base(dbContext)
        {
            _mapper = mapper;
            _accessoryRepository = accessoryRepository;
            _assetRepository = assetRepository;
            _consumableRepository = consumableRepository;
            _licenseRepository = licenseRepository;
        }

        public async Task<UserProductDto> GetDtoAsync(UserProduct entity)
        {
            Guid productId = Guid.Empty;
            string productType = string.Empty;
            string productTag = string.Empty;

            if (entity.AccessoryId != null)
            {
                Accessory accessory = await _accessoryRepository.GetByIdAsync((Guid)entity.AccessoryId);
                productId = accessory.Id;
                productType = "Accessory";
                productTag = accessory.Tag;
            }
            else if (entity.AssetId != null)
            {
                Asset asset = await _assetRepository.GetByIdAsync((Guid)entity.AssetId);
                productId = asset.Id;
                productType = "Asset";
                productTag = asset.Tag;
            }
            else if (entity.ConsumableId != null)
            {
                Consumable consumable = await _consumableRepository.GetByIdAsync((Guid)entity.ConsumableId);
                productId = consumable.Id;
                productType = "Consumable";
                productTag = consumable.Tag;
            }
            else if (entity.LicenseId != null)
            {
                License license = await _licenseRepository.GetByIdAsync((Guid)entity.LicenseId);
                productId = license.Id;
                productType = "License";
                productTag = license.Tag;
            }
            return new UserProductDto()
            {
                Id = entity.Id,
                CreatedDate = entity.CreatedDate,
                UpdatedDate = entity.UpdatedDate,
                AssignDate = entity.AssignDate,
                ProductId = productId,
                ProductType = productType,
                ProductTag = productTag,
                Notes = entity.Notes,
                Quantity = entity.Quantity,
                UserId = entity.UserId,
            };
        }
        public async Task<List<UserProductDto>> GetDtosAsync(List<UserProduct> entities)
        {
            List<UserProductDto> dtos = new List<UserProductDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<UserProductDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.UserProducts.ToListAsync();
            return await GetDtosAsync(entities);
        }
    }

}
