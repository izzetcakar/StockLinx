using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class LocationRepository : Repository<Location>, ILocationRepository
    {
        private readonly IMapper _mapper;
        public LocationRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public LocationDto GetLocationDto(Location location)
        {
            var locationDto = _mapper.Map<LocationDto>(location);
            return locationDto;
        }
        public List<LocationDto> GetLocationDtos(List<Location> locations)
        {
            var locationDtos = new List<LocationDto>();
            locationDtos = _mapper.Map<List<LocationDto>>(locations);
            return locationDtos;
        }
        public async Task<List<LocationDto>> GetAllLocationDtos()
        {
            var locations = await dbContext.Locations.AsNoTracking().ToListAsync();
            return GetLocationDtos(locations);
        }
    }
}
