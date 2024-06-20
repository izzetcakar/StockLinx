using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IComponentService : IService<Component>
    {
        Task<ComponentDto> GetDtoAsync(Guid id);
        Task<List<ComponentDto>> GetAllDtosAsync();
        Task<ComponentDto> CreateComponentAsync(ComponentCreateDto dto);
        Task<List<ComponentDto>> CreateRangeComponentAsync(List<ComponentCreateDto> dtos);
        Task<ComponentDto> UpdateComponentAsync(ComponentUpdateDto dto);
        Task DeleteComponentAsync(Guid id);
        Task DeleteRangeComponentAsync(List<Guid> ids);
        Task<AssetProductDto> CheckInAsync(AssetProductCheckInDto checkInDto);
        Task<List<AssetProductDto>> CheckOutAsync(AssetProductCheckOutDto checkOutDto);
        Task CheckTagExistAsync(string tag);
        Task CheckTagExistAsync(List<string> tags);
        Task<List<ComponentDto>> FilterAllAsync(string filter);
    }
}
