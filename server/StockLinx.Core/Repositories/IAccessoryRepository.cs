using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IAccessoryRepository : IRepository<Accessory>
    {
        Task<AccessoryDto> GetAccessoryDto(Accessory accessory);
        Task<List<AccessoryDto>> GetAccessoryDtos(List<Accessory> accessories);
        Task<List<AccessoryDto>> GetAllAccessoryDtos();
    }
}
