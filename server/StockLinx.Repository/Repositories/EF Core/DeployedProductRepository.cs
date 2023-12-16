using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class DeployedProductRepository : Repository<DeployedProduct>, IDeployedProductRepository
    {
        private readonly IMapper _mapper;
        public DeployedProductRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public DeployedProductDto GetDto(DeployedProduct entity)
        {
            var dto = _mapper.Map<DeployedProductDto>(entity);
            if (entity.AccessoryId != null)
            {
                var accessory = dbContext.Accessories.Include(a => a.Manufacturer).FirstOrDefault(a => a.Id == entity.AccessoryId);
                var category = dbContext.Categories.FirstOrDefault(c => c.Id == accessory.CategoryId);
                dto.ProductId = accessory.Id;
                dto.ProductType = "Accessory";
                dto.ProductRoute = $"/accessory/{accessory.Id}";
                dto.Category = category.Name;
                dto.ProductName = accessory.Name;
                dto.ProductDescription = Generic.AddHyphenIfNotEmpty(accessory.Name) + accessory.ModelNo;
                return dto;
            }
            else if (entity.AssetId != null)
            {
                var asset = dbContext.Assets.Include(a => a.Model).ThenInclude(m => m.Manufacturer).FirstOrDefault(a => a.Id == entity.AssetId);
                var model = asset.Model;
                var category = dbContext.Categories.FirstOrDefault(c => c.Id == model.CategoryId);
                var description = Generic.AddHyphenIfNotEmpty(model.Manufacturer.Name) + model.ModelNo;
                dto.ProductId = asset.Id;
                dto.ProductType = "Asset";
                dto.ProductRoute = $"/asset/{asset.Id}";
                dto.Category = category.Name;
                dto.ProductName = asset.Name;
                dto.ProductDescription = description;
                return dto;
            }
            else if (entity.ComponentId != null)
            {
                var component = dbContext.Components.FirstOrDefault(c => c.Id == entity.ComponentId);
                var category = dbContext.Categories.FirstOrDefault(c => c.Id == component.CategoryId);
                dto.ProductId = component.Id;
                dto.ProductType = "Component";
                dto.ProductRoute = $"/component/{component.Id}";
                dto.Category = category.Name;
                dto.ProductName = component.Name;
                dto.ProductDescription = component.SerialNo;
                return dto;
            }
            else if (entity.ConsumableId != null)
            {
                var consumable = dbContext.Consumables.Include(c => c.Manufacturer).FirstOrDefault(c => c.Id == entity.ConsumableId);
                var category = dbContext.Categories.FirstOrDefault(c => c.Id == consumable.CategoryId);
                var description = Generic.AddHyphenIfNotEmpty(consumable.Manufacturer?.Name) + consumable.ModelNo;
                dto.ProductId = consumable.Id;
                dto.ProductType = "Consumable";
                dto.ProductRoute = $"/consumable/{consumable.Id}";
                dto.Category = category.Name;
                dto.ProductName = consumable.Name;
                dto.ProductDescription = description;
                return dto;
            }
            else if (entity.LicenseId != null)
            {
                var license = dbContext.Licenses.Include(l => l.Manufacturer).FirstOrDefault(l => l.Id == entity.LicenseId);
                var category = dbContext.Categories.FirstOrDefault(c => c.Id == license.CategoryId);
                dto.ProductId = license.Id;
                dto.ProductType = "License";
                dto.ProductRoute = $"/license/{license.Id}";
                dto.Category = category.Name;
                dto.ProductName = license.Name;
                dto.ProductDescription = Generic.AddHyphenIfNotEmpty(license.Manufacturer.Name) + license.LicenseKey;
            }
            return dto;
        }
        public List<DeployedProductDto> GetDtos(List<DeployedProduct> entities)
        {
            var dtos = new List<DeployedProductDto>();
            foreach (var entity in entities)
            {
                dtos.Add(GetDto(entity));
            }
            return dtos;
        }
        public async Task<List<DeployedProductDto>> GetAllDtos()
        {
            var entities = await dbContext.DeployedProducts.Where(d => d.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }

}
