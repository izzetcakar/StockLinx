using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILocationService : IService<Location>
    {
        Task CreateLocationAsync(LocationCreateDto createDto);
        Task UpdateLocationAsync(LocationUpdateDto updateDto);
        Task DeleteLocationAsync(Guid locationId);
        Task<List<ProductLocationCounterDto>> GetAllCounts();
    }
}
