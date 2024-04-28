using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAssetProductRepository : IRepository<AssetProduct>
    {
        Task<AssetProductDto> GetDtoAsync(AssetProduct entity);
        Task<List<AssetProductDto>> GetDtosAsync(List<AssetProduct> entities);
        Task<List<AssetProductDto>> GetAllDtosAsync();
    }
}
