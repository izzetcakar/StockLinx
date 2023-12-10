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

        public LocationDto GetDto(Location entity)
        {
            return _mapper.Map<LocationDto>(entity);
        }
        public List<LocationDto> GetDtos(List<Location> entities)
        {
            var dtos = new List<LocationDto>();
            dtos = _mapper.Map<List<LocationDto>>(entities);
            return dtos;
        }
        public async Task<List<LocationDto>> GetAllDtos()
        {
            var entities = await dbContext.Locations.Where(l => l.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
