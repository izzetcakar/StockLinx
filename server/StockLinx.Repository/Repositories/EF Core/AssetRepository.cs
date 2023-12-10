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
        public AssetRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<AssetDto> GetDto(Asset entity)
        {
            var deployedProducts = await dbContext.DeployedProducts.Where(d => d.DeletedDate == null).AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId && b.DeletedDate == null).Select(b => b.CompanyId).FirstOrDefaultAsync();
            if (companyId == null)
            {
                return null;
            }
            var dto = _mapper.Map<AssetDto>(entity);
            dto.CompanyId = companyId;
            return dto;
        }
        public async Task<List<AssetDto>> GetDtos(List<Asset> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.Where(d => d.DeletedDate == null).AsNoTracking().ToListAsync();
            var dtos = new List<AssetDto>();

            foreach (var asset in entities)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == asset.BranchId && b.DeletedDate == null).Select(b => b.CompanyId).FirstOrDefaultAsync();
                if (companyId == null)
                {
                    continue;
                }
                var dto = _mapper.Map<AssetDto>(asset);
                dto.CompanyId = companyId;
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<AssetDto>> GetAllDtos()
        {
            var entities = await dbContext.Assets.Where(a => a.DeletedDate == null).AsNoTracking().ToListAsync();
            return await GetDtos(entities);
        }
    }
}
