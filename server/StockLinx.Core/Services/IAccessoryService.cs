using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IAccessoryService : IService<Accessory>
    {
        Task CreateAccessoryAsync(AccessoryCreateDto createDto);
    }
}
