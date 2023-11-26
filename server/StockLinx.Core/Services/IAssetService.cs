using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAssetService : IService<Asset>
    {
        Task<List<AssetDto>> GetAllAssetDtos();
        Task<List<AssetDto>> CreateAssetAsync(AssetCreateDto createDto);
        Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> createDtos);
        Task UpdateAssetAsync(AssetUpdateDto updateDto);
        Task DeleteAssetAsync(Guid assetId);
        Task DeleteRangeAssetAsync(List<Guid> assetIds);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
