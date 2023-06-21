using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAssetService : IService<Asset>
    {
        Task CreateAssetAsync(AssetCreateDto createDto);
    }
}
