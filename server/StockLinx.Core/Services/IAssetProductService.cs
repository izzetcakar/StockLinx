using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAssetProductService : IService<AssetProduct>
    {
        Task<AssetProductDto> GetDtoAsync(Guid id);
        Task<List<AssetProductDto>> GetAllDtosAsync();
        Task<AssetProductDto> CreateAssetProductAsync(AssetProductCreateDto dto);
        Task<List<AssetProductDto>> CreateRangeAssetProductAsync(List<AssetProductCreateDto> dtos);
        Task DeleteAssetProductAsync(Guid id);
        Task<List<AssetProductDto>> FilterAllAsync(string filter);
        Task<List<AssetProductDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
