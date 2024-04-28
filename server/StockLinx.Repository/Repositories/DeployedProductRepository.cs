﻿using AutoMapper;
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

        public async Task<DeployedProductDto> GetDtoAsync(DeployedProduct entity)
        {
            DeployedProductDto dto = _mapper.Map<DeployedProductDto>(entity);
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
                var model = await dbContext.Models.SingleOrDefaultAsync(m => (asset.ModelId != null && m.Id == asset.ModelId));
                if (model != null)
                {
                    var manufacturer = await dbContext.Manufacturers.SingleOrDefaultAsync(m => m.Id == model.ManufacturerId);
                    var category = await dbContext.Categories.SingleOrDefaultAsync(c => c.Id == model.CategoryId);
                }
                dto.ProductId = asset.Id;
                dto.ProductType = "Asset";
                dto.ProductRoute = $"/asset/{asset.Id}";
                dto.ProductName = asset.Name;
                return dto;
            }
            else if (entity.ComponentId != null)
            {
                var component = await dbContext.Components.SingleOrDefaultAsync(c => c.Id == entity.ComponentId);
                if (component == null) return null;
                dto.ProductId = component.Id;
                dto.ProductType = "Component";
                dto.ProductRoute = $"/component/{component.Id}";
                dto.ProductName = component.Name;
                return dto;
            }
            else if (entity.ConsumableId != null)
            {
                var consumable = await dbContext.Consumables.SingleOrDefaultAsync(c => c.Id == entity.ConsumableId);
                if (consumable == null) return null;
                var manufacturer = await dbContext.Manufacturers.SingleOrDefaultAsync(m => m.Id == consumable.ManufacturerId);
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
                var manufacturer = await dbContext.Manufacturers.SingleOrDefaultAsync(m => m.Id == license.ManufacturerId);
                dto.ProductId = license.Id;
                dto.ProductType = "License";
                dto.ProductRoute = $"/license/{license.Id}";
                dto.ProductName = license.Name;
                return dto;
            }
            return dto;
        }
        public async Task<List<DeployedProductDto>> GetDtosAsync(List<DeployedProduct> entities)
        {
            List<DeployedProductDto> dtos = new List<DeployedProductDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<DeployedProductDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.DeployedProducts.ToListAsync();
            return await GetDtosAsync(entities);
        }
    }

}