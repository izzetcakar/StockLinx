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

        public ManufacturerDto GetManufacturerDto(Manufacturer manufacturer)
        {
            var manufacturerDto = _mapper.Map<ManufacturerDto>(manufacturer);
            return manufacturerDto;
        }
        public List<ManufacturerDto> GetManufacturerDtos(List<Manufacturer> manufacturers)
        {
            var manufacturerDtos = new List<ManufacturerDto>();
            manufacturerDtos = _mapper.Map<List<ManufacturerDto>>(manufacturers);
            return manufacturerDtos;
        }
        public async Task<List<ManufacturerDto>> GetAllManufacturerDtos()
        {
            var manufacturers = await dbContext.Manufacturers.AsNoTracking().ToListAsync();
            return GetManufacturerDtos(manufacturers);
        }
    }
}
