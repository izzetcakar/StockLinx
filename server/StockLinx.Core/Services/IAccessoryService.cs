using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAccessoryService : IService<Accessory>
    {
        Task<List<AccessoryDto>> GetAccessoryDtos();
        Task CreateAccessoryAsync(AccessoryCreateDto createDto);
        Task CreateRangeAccessoryAsync(List<AccessoryCreateDto> createDtos);
        Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto);
        Task DeleteAccessoryAsync(Guid accessoryId);
        Task DeleteRangeAccessoryAsync(List<Guid> accessoryIds);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
