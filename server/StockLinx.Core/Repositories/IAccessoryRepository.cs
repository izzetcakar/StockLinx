using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAccessoryRepository : IRepository<Accessory>
    {
        Task<AccessoryDto> GetDtoAsync(Accessory entity);
        Task<List<AccessoryDto>> GetDtosAsync(List<Accessory> entities);
        Task<List<AccessoryDto>> GetAllDtosAsync();
        Task CanDeleteAsync(Guid id);
        Task<int> GetAvaliableQuantityAsync(Accessory entity);
    }
}
