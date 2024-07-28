using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAssetRepository : IRepository<Asset>
    {
        AssetDto GetDto(Asset entity);
        List<AssetDto> GetDtos(List<Asset> entities);
        Task<List<AssetDto>> GetAllDtosAsync();
        Task<List<AssetDto>> GetAllDtosAsync(List<Guid> companyIds);
        Task CanDeleteAsync(Guid id);
        Task<List<AssetDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
