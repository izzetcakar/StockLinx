using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IComponentService : IService<Component>
    {
        Task<List<ComponentDto>> GetAllDtos();
        Task<ComponentDto> CreateComponentAsync(ComponentCreateDto createDto);
        Task<List<ComponentDto>> CreateRangeComponentAsync(List<ComponentCreateDto> createDtos);
        Task UpdateComponentAsync(ComponentUpdateDto updateDto);
        Task DeleteComponentAsync(Guid componentId);
        Task DeleteRangeComponentAsync(List<Guid> componentIds);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
