using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IConsumableService : IService<Consumable>
    {
        Task<ConsumableDto> GetDtoAsync(Guid id);
        Task<List<ConsumableDto>> GetAllDtosAsync();
        Task<ConsumableDto> CreateConsumableAsync(ConsumableCreateDto dto);
        Task<List<ConsumableDto>> CreateRangeConsumableAsync(List<ConsumableCreateDto> dtos);
        Task<ConsumableDto> UpdateConsumableAsync(ConsumableUpdateDto dto);
        Task DeleteConsumableAsync(Guid id);
        Task DeleteRangeConsumableAsync(List<Guid> ids);
        Task<UserProductDto> CheckInAsync(UserProductCheckInDto checkInDto);
        Task<List<UserProductDto>> CheckOutAsync(UserProductCheckOutDto checkOutDto);
        Task CheckTagExistAsync(string tag);
        Task CheckTagExistAsync(List<string> tags);
        Task<List<ConsumableDto>> FilterAllAsync(string filter);
    }
}
