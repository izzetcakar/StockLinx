using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAccessoryService : IService<Accessory>
    {
        Task<AccessoryDto> GetDto(Guid id);
        Task<List<AccessoryDto>> GetAllDtos();
        Task<AccessoryDto> CreateAccessoryAsync(AccessoryCreateDto createDto);
        Task<List<AccessoryDto>> CreateRangeAccessoryAsync(List<AccessoryCreateDto> createDtos);
        Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto);
        Task DeleteAccessoryAsync(Guid accessoryId);
        Task DeleteRangeAccessoryAsync(List<Guid> accessoryIds);
    }
}
