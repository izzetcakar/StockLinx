using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IConsumableRepository : IRepository<Consumable>
    {
        Task<ConsumableDto> GetDto(Consumable entity);
        Task<List<ConsumableDto>> GetDtos(List<Consumable> entities);
        Task<List<ConsumableDto>> GetAllDtos();
    }
}
