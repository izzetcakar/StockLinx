using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAssetService : IService<Asset>
    {
        Task<AssetDto> GetDtoAsync(Guid id);
        Task<List<AssetDto>> GetAllDtosAsync();
        Task<AssetDto> CreateAssetAsync(AssetCreateDto dto);
        Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> dtos);
        Task<AssetDto> UpdateAssetAsync(AssetUpdateDto dto);
        Task DeleteAssetAsync(Guid id);
        Task DeleteRangeAssetAsync(List<Guid> ids);
        Task<EmployeeProductDto> CheckInAsync(AssetCheckInDto checkInDto);
        Task<EmployeeProductDto> CheckOutAsync(AssetCheckOutDto checkOutDto);
        Task CheckTagExistAsync(string tag);
        Task CheckTagExistAsync(List<string> tags);
        Task<List<AssetDto>> FilterAllAsync(string filter);
        Task<List<AssetDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
