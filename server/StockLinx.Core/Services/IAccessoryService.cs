using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAccessoryService : IService<Accessory>
    {
        Task<List<AccessoryDto>> GetAccessoriesAsync();
        Task CreateAccessoryAsync(AccessoryCreateDto createDto);
        Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto);
        Task DeleteAccessoryAsync(Guid accessoryId);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
