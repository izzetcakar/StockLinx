using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ILocationRepository : IRepository<Location>
    {
        LocationDto GetLocationDto(Location location);
        List<LocationDto> GetLocationDtos(List<Location> locations);
        Task<List<LocationDto>> GetAllLocationDtos();
    }
}
