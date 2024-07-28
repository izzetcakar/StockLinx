using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IComponentRepository : IRepository<Component>
    {
        Task<ComponentDto> GetDtoAsync(Component entity);
        Task<List<ComponentDto>> GetDtosAsync(List<Component> entities);
        Task<List<ComponentDto>> GetAllDtosAsync();
        Task<List<ComponentDto>> GetAllDtosAsync(List<Guid> companyIds);
        Task CanDeleteAsync(Guid id);
        Task<int> GetAvaliableQuantityAsync(Component entity);
        Task<List<ComponentDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
