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
            var dtos = new List<AssetDto>();

            foreach (var entity in entities)
            {
                var dto = GetDto(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<AssetDto>> GetAllDtos()
        {
            var entities = await dbContext.Assets.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async Task<bool> CanDelete(Guid id)
        {
            var entity = dbContext.Accessories.Find(id);
            if (entity == null)
            {
                throw new Exception("Accessory not found.");
            }
            var deployedProducts = await dbContext.DeployedProducts.AnyAsync(d => d.AccessoryId.HasValue && d.AccessoryId == id);
            if (deployedProducts)
            {
                throw new Exception("Cannot delete asset because it is used in deployed products.");
            }
            return true;
        }
    }
}
