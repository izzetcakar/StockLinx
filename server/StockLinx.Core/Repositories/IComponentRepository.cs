using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IComponentRepository : IRepository<Component>
    {
        Task<ComponentDto> GetComponentDto(Component component);
        Task<List<ComponentDto>> GetComponentDtos(List<Component> components);
        Task<List<ComponentDto>> GetAllComponentDtos();
    }
}
