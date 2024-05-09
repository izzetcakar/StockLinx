using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class AssetProductRepository : Repository<AssetProduct>, IAssetProductRepository
    {
        private readonly IMapper _mapper;

        public AssetProductRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<AssetProductDto> GetDtoAsync(AssetProduct entity)
        {
            AssetProductDto dto = _mapper.Map<AssetProductDto>(entity);
            var asset = await GetByIdAsync(entity.Id);
            if (entity.ComponentId != null)
            {
                var component = await dbContext.Components.SingleOrDefaultAsync(c =>
                    c.Id == entity.ComponentId
                );
                if (component == null)
                    return null;
                dto.ProductId = component.Id;
                dto.ProductType = "Consumable";
                dto.ProductRoute = $"/consumable/{component.Id}";
                dto.ProductName = component.Name;
                return dto;
            }
            else if (entity.LicenseId != null)
            {
                var license = await dbContext.Licenses.SingleOrDefaultAsync(l =>
                    l.Id == entity.LicenseId
                );
                if (license == null)
                    return null;
                dto.ProductId = license.Id;
                dto.ProductType = "License";
                dto.ProductRoute = $"/license/{license.Id}";
                dto.ProductName = license.Name;
                return dto;
            }
            return dto;
        }

        public async Task<List<AssetProductDto>> GetDtosAsync(List<AssetProduct> entities)
        {
            List<AssetProductDto> dtos = new List<AssetProductDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<AssetProductDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.AssetProducts.ToListAsync();
            return await GetDtosAsync(entities);
        }
    }
}
