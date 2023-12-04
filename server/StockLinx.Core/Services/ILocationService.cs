using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILocationService : IService<Location>
    {
        Task<LocationDto> GetDto(Guid id);
        Task<List<LocationDto>> GetAllDtos();
        Task<LocationDto> CreateLocationAsync(LocationCreateDto createDto);
        Task<List<LocationDto>> CreateRangeLocationAsync(List<LocationCreateDto> createDtos);
        Task UpdateLocationAsync(LocationUpdateDto updateDto);
        Task DeleteLocationAsync(Guid locationId);
        Task DeleteRangeLocationAsync(List<Guid> locationIds);
    }
}
