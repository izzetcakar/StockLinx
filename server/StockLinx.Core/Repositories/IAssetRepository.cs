using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAssetRepository : IRepository<Asset>
    {
        Task<AssetDto> GetAssetDto(Asset asset);
        Task<List<AssetDto>> GetAssetDtos(List<Asset> assets);
        Task<List<AssetDto>> GetAllAssetDtos();
    }
}
