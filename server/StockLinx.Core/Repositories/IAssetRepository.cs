using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAssetRepository : IRepository<Asset>
    {
        AssetDto GetDto(Asset entity);
        List<AssetDto> GetDtos(List<Asset> entities);
        Task<List<AssetDto>> GetAllDtosAsync();
        Task<bool> CanDeleteAsync(Guid id);
        Task CheckTagExistAsync(string tag);
        Task CheckTagExistAsync(List<string> tags);
    }
}
