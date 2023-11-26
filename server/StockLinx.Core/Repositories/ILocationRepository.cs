using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ILocationRepository : IRepository<Location>
    {
        LocationDto GetDto(Location entity);
        List<LocationDto> GetDtos(List<Location> entities);
        Task<List<LocationDto>> GetAllDtos();
    }
}
