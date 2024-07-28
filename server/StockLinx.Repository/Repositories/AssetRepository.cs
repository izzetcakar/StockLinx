using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class AssetRepository : Repository<Asset>, IAssetRepository
    {
        private readonly IMapper _mapper;

        public AssetRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public AssetDto GetDto(Asset entity)
        {
            return _mapper.Map<AssetDto>(entity);
        }

        public List<AssetDto> GetDtos(List<Asset> entities)
        {
            List<AssetDto> dtos = new List<AssetDto>();

            foreach (var entity in entities)
            {
                var dto = GetDto(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<AssetDto>> GetAllDtosAsync()
        {
            List<Asset> entities = await dbContext.Assets.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async Task<List<AssetDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            List<Asset> entities = await dbContext
                .Assets.Where(a => companyIds.Contains(a.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return GetDtos(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            bool employeeProducts = await dbContext.EmployeeProducts.AnyAsync(d =>
                d.AssetId.HasValue && d.AssetId == id
            );
            if (employeeProducts)
            {
                throw new Exception("Cannot delete asset because it has deployed.");
            }
            bool assetProducts = await dbContext.AssetProducts.AnyAsync(d => d.AssetId == id);
            if (assetProducts)
            {
                throw new Exception("Cannot delete asset because it has products.");
            }
        }

        public Task<List<AssetDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Assets.Where(a => ids.Contains(a.Id))
                .Select(a => new AssetDisplayDto
                {
                    Name = a.Name,
                    Company = a.Company.Name,
                    Model = a.Model.Name,
                    Supplier = a.Supplier.Name,
                    ProductStatus = a.ProductStatus.Name,
                    OrderNo = a.OrderNo,
                    SerialNo = a.SerialNo,
                    PurchaseCost = a.PurchaseCost,
                    PurchaseDate = a.PurchaseDate,
                    Tag = a.Tag,
                    Notes = a.Notes,
                });
            return query.ToListAsync();
        }
    }
}
