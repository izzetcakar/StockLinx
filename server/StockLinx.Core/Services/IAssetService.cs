using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAssetService : IService<Asset>
    {
        Task<AssetDto> GetDtoAsync(Guid id);
        Task<List<AssetDto>> GetAllDtosAsync();
        Task<List<AssetDto>> CreateAssetAsync(AssetCreateDto dto);
        Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> dtos);
        Task<AssetDto> UpdateAssetAsync(AssetUpdateDto dto);
        Task DeleteAssetAsync(Guid id);
        Task DeleteRangeAssetAsync(List<Guid> ids);
        Task<DeployedProduct> CheckInAsync(ProductCheckInDto checkInDto);
        Task CheckOutAsync(Guid id);
    }
}
