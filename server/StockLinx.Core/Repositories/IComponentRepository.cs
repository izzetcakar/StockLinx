using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IComponentRepository : IRepository<Component>
    {
        Task<ComponentDto> GetDto(Component entity);
        Task<List<ComponentDto>> GetDtos(List<Component> entities);
        Task<List<ComponentDto>> GetAllDtos();
        Task<bool> CanDelete(Guid id);
    }
}
