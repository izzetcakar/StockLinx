using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAccessoryRepository : IRepository<Accessory>
    {
        Task<AccessoryDto> GetDto(Accessory entity);
        Task<List<AccessoryDto>> GetDtos(List<Accessory> entities);
        Task<List<AccessoryDto>> GetAllDtos();
        Task<bool> CanDelete(Guid id);
    }
}
