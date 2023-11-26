using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAssetRepository : IRepository<Asset>
    {
        Task<AssetDto> GetDto(Asset entity);
        Task<List<AssetDto>> GetDtos(List<Asset> entities);
        Task<List<AssetDto>> GetAllDtos();
    }
}
