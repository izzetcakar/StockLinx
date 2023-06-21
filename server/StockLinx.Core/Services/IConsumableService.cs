using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IConsumableService : IService<Consumable>
    {
        Task CreateConsumableAsync(ConsumableCreateDto createDto);
    }
}
