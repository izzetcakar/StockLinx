using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IComponentService : IService<Component>
    {
        Task<List<ComponentDto>> GetComponentDtos();
        Task CreateComponentAsync(ComponentCreateDto createDto);
        Task CreateRangeComponentAsync(List<ComponentCreateDto> createDtos);
        Task UpdateComponentAsync(ComponentUpdateDto updateDto);
        Task DeleteComponentAsync(Guid componentId);
        Task DeleteRangeComponentAsync(List<Guid> componentIds);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
