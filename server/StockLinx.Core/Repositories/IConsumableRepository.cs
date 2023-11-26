using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IConsumableRepository : IRepository<Consumable>
    {
        Task<ConsumableDto> GetConsumableDto(Consumable consumable);
        Task<List<ConsumableDto>> GetConsumableDtos(List<Consumable> consumables);
        Task<List<ConsumableDto>> GetAllConsumableDtos();
    }
}
