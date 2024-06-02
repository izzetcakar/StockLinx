using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILocationService : IService<Location>
    {
        Task<LocationDto> GetDtoAsync(Guid id);
        Task<List<LocationDto>> GetAllDtosAsync();
        Task<LocationDto> CreateLocationAsync(LocationCreateDto dto);
        Task<List<LocationDto>> CreateRangeLocationAsync(List<LocationCreateDto> dtos);
        Task<LocationDto> UpdateLocationAsync(LocationUpdateDto dto);
        Task DeleteLocationAsync(Guid id);
        Task DeleteRangeLocationAsync(List<Guid> ids);
        Task<List<LocationDto>> FilterAllAsync(string filter);
    }
}
