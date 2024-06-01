using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
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

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            await CheckExistAsync(id);
            bool userProducts = await dbContext.UserProducts.AnyAsync(d =>
                d.AssetId.HasValue && d.AssetId == id
            );
            if (userProducts)
            {
                throw new Exception("Cannot delete asset because it has deployed.");
            }
            bool assetProducts = await dbContext.AssetProducts.AnyAsync(d => d.AssetId == id);
            if (assetProducts)
            {
                throw new Exception("Cannot delete asset because it has products.");
            }
            return true;
        }
    }
}
