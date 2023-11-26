using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IConsumableService : IService<Consumable>
    {
        Task<List<ConsumableDto>> GetAllDtos();
        Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto createDto);
        Task<List<ConsumableDto>> CreateRangeConsumableAsync(List<ConsumableCreateDto> createDtos);
        Task UpdateConsumableAsync(ConsumableUpdateDto updateDto);
        Task DeleteConsumableAsync(Guid consumableId);
        Task DeleteRangeConsumableAsync(List<Guid> consumableIds);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
