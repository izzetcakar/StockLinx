using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IComponentService : IService<Component>
    {
        Task<ComponentDto> GetDto(Guid id);
        Task<List<ComponentDto>> GetAllDtos();
        Task<ComponentDto> CreateComponentAsync(ComponentCreateDto createDto);
        Task<List<ComponentDto>> CreateRangeComponentAsync(List<ComponentCreateDto> createDtos);
        Task<ComponentDto> UpdateComponentAsync(ComponentUpdateDto updateDto);
        Task DeleteComponentAsync(Guid componentId);
        Task DeleteRangeComponentAsync(List<Guid> componentIds);
    }
}
