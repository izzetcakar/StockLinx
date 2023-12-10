using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ManufacturerRepository : Repository<Manufacturer>, IManufacturerRepository
    {
        private readonly IMapper _mapper;
        public ManufacturerRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public ManufacturerDto GetDto(Manufacturer entity)
        {
            return _mapper.Map<ManufacturerDto>(entity);
        }
        public List<ManufacturerDto> GetDtos(List<Manufacturer> entities)
        {
            var dtos = new List<ManufacturerDto>();
            dtos = _mapper.Map<List<ManufacturerDto>>(entities);
            return dtos;
        }
        public async Task<List<ManufacturerDto>> GetAllDtos()
        {
            var entities = await dbContext.Manufacturers.Where(m => m.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
