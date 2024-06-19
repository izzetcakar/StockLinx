using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IConsumableRepository : IRepository<Consumable>
    {
        Task<ConsumableDto> GetDtoAsync(Consumable entity);
        Task<List<ConsumableDto>> GetDtosAsync(List<Consumable> entities);
        Task<List<ConsumableDto>> GetAllDtosAsync();
        Task CanDeleteAsync(Guid id);
        Task<int> GetAvaliableQuantityAsync(Consumable entity);
    }
}
