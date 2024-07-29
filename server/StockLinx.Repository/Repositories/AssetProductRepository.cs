using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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

        public async Task<string> GetProductTag(AssetProduct assetProduct)
        {
            if (assetProduct.ComponentId != null)
            {
                return await _componentRepository.GetByIdAsync((Guid)assetProduct.ComponentId)
                    .ContinueWith(a => a.Result.Tag);
            }
            else if (assetProduct.LicenseId != null)
            {
                return await _licenseRepository.GetByIdAsync((Guid)assetProduct.LicenseId)
                    .ContinueWith(a => a.Result.Tag);
            }
            return string.Empty;
        }

        public async Task<string> GetProductDescription(AssetProduct assetProduct)
        {
            if (assetProduct.ComponentId != null)
            {
                var res = await _componentRepository.GetByIdAsync((Guid)assetProduct.ComponentId);
                return res.Name + "-" + res.SerialNo;
            }
            else if (assetProduct.LicenseId != null)
            {
                var res = await _licenseRepository.GetByIdAsync((Guid)assetProduct.LicenseId);
                return res.Name + "-" + res.LicenseKey + "-" + res.ExpirationDate?.ToString("MM/dd/yyyy");
            }
            return string.Empty;
        }

        public async Task<string> GetAssetTag(AssetProduct assetProduct)
        {
            var res = await dbContext.Assets
                .Where(a => a.Id == assetProduct.AssetId)
                .FirstOrDefaultAsync();
            return res.Tag;
        }

        public async Task<List<AssetProductDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var assetProducts = await dbContext.AssetProducts
                .Where(a => ids.Contains(a.Id))
                .ToListAsync();

            var displayDtos = new List<AssetProductDisplayDto>();

            foreach (var assetProduct in assetProducts)
            {
                var assetTag = await GetAssetTag(assetProduct);
                var productTag = await GetProductTag(assetProduct);
                var dto = new AssetProductDisplayDto
                {
                    Asset = assetTag,
                    Product = productTag,
                    Quantity = assetProduct.Quantity,
                    Seat = $"Seat {displayDtos.Count + 1}",
                    AssignDate = assetProduct.AssignDate,
                    Notes = assetProduct.Notes,
                };
                displayDtos.Add(dto);
            }

            return displayDtos;
        }
    }
}
