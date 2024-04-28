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
        public UserProductRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<UserProductDto> GetDtoAsync(UserProduct entity)
        {
            UserProductDto dto = _mapper.Map<UserProductDto>(entity);
            if (entity.AccessoryId != null)
            {
                var accessory = await dbContext.Accessories.SingleOrDefaultAsync(a => a.Id == entity.AccessoryId);
                if (accessory == null) return null;
                dto.ProductId = accessory.Id;
                dto.ProductType = "Accessory";
                dto.ProductRoute = $"/accessory/{accessory.Id}";
                dto.ProductName = accessory.Name;
                return dto;
            }
            else if (entity.AssetId != null)
            {
                var asset = await dbContext.Assets.SingleOrDefaultAsync(a => a.Id == entity.AssetId);
                if (asset == null) return null;
                dto.ProductId = asset.Id;
                dto.ProductType = "Asset";
                dto.ProductRoute = $"/asset/{asset.Id}";
                dto.ProductName = asset.Name;
                return dto;
            }
            else if (entity.ConsumableId != null)
            {
                var consumable = await dbContext.Consumables.SingleOrDefaultAsync(c => c.Id == entity.ConsumableId);
                if (consumable == null) return null;
                dto.ProductId = consumable.Id;
                dto.ProductType = "Consumable";
                dto.ProductRoute = $"/consumable/{consumable.Id}";
                dto.ProductName = consumable.Name;
                return dto;
            }
            else if (entity.LicenseId != null)
            {
                var license = await dbContext.Licenses.SingleOrDefaultAsync(l => l.Id == entity.LicenseId);
                if (license == null) return null;
                dto.ProductId = license.Id;
                dto.ProductType = "License";
                dto.ProductRoute = $"/license/{license.Id}";
                dto.ProductName = license.Name;
                return dto;
            }
            return dto;
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
