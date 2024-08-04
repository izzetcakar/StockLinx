using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAssetProductRepository : IRepository<AssetProduct>
    {
        Task<AssetProductDto> GetDtoAsync(AssetProduct entity);
        Task<List<AssetProductDto>> GetDtosAsync(List<AssetProduct> entities);
        Task<List<AssetProductDto>> GetAllDtosAsync();
        Task<List<AssetProductDisplayDto>> GetDisplayDtos(List<Guid> ids);
        Task<string> GetProductTag(AssetProduct assetProduct);
        Task<string> GetProductDescription(AssetProduct assetProduct);
        Task<List<AssetProduct>> GetAllByCompanies(List<Guid> companyIds);
    }
}
