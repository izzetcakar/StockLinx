using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAccessoryService : IService<Accessory>
    {
        Task CreateAccessoryAsync(AccessoryCreateDto createDto);
        Task UpdateAccessoryAsync(AccessoryUpdateDto updateDto);
        Task DeleteAccessoryAsync(Guid accessoryId);
    }
}
