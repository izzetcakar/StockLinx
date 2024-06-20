using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class AssetProductRepository : Repository<AssetProduct>, IAssetProductRepository
    {
        private readonly IComponentRepository _componentRepository;
        private readonly ILicenseRepository _licenseRepository;
        private readonly IMapper _mapper;

        public AssetProductRepository(AppDbContext dbContext, IMapper mapper,
            IComponentRepository componentRepository, ILicenseRepository licenseRepository)
            : base(dbContext)
        {
            _componentRepository = componentRepository;
            _licenseRepository = licenseRepository;
            _mapper = mapper;
        }

        public async Task<AssetProductDto> GetDtoAsync(AssetProduct entity)
        {
            AssetProductDto dto = _mapper.Map<AssetProductDto>(entity);
            if (entity.ComponentId != null)
            {
                Component component = await _componentRepository.GetByIdAsync((Guid)entity.ComponentId);
                dto.ProductType = "Consumable";
                dto.ProductTag = component.Tag;
                return dto;
            }
            else if (entity.LicenseId != null)
            {
                License license = await _licenseRepository.GetByIdAsync((Guid)entity.LicenseId);
                dto.ProductType = "License";
                dto.ProductTag = license.Tag;
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
