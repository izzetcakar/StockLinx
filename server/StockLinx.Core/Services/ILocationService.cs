using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILocationService : IService<Location>
    {
        Task CreateLocationAsync(LocationCreateDto createDto);
    }
}
