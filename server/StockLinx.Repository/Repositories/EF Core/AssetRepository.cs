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

        public async Task<AssetDto> GetAssetDto(Asset asset)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == asset.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            if (companyId == null)
            {
                return null;
            }
            var assetDto = _mapper.Map<AssetDto>(asset);
            assetDto.CompanyId = companyId;
            return assetDto;
        }
        public async Task<List<AssetDto>> GetAssetDtos(List<Asset> assets)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var assetDtos = new List<AssetDto>();

            foreach (var asset in assets)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == asset.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                if (companyId == null)
                {
                    continue;
                }
                var assetDto = _mapper.Map<AssetDto>(asset);
                assetDto.CompanyId = companyId;
                assetDtos.Add(assetDto);
            }
            return assetDtos;
        }
        public async Task<List<AssetDto>> GetAllAssetDtos()
        {
            var assets = await dbContext.Assets.AsNoTracking().ToListAsync();
            return await GetAssetDtos(assets);
        }
    }
}
