using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IComponentService : IService<Component>
    {
        Task CreateComponentAsync(ComponentCreateDto createDto);
        Task UpdateComponentAsync(ComponentUpdateDto updateDto);
        Task DeleteComponentAsync(Guid componentId);
    }
}
