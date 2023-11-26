using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class FieldSetRepository : Repository<FieldSet>, IFieldSetRepository
    {
        private readonly IMapper _mapper;
        public FieldSetRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public FieldSetDto GetDto(FieldSet entity)
        {
            return _mapper.Map<FieldSetDto>(entity);
        }
        public List<FieldSetDto> GetDtos(List<FieldSet> entities)
        {
            var dtos = new List<FieldSetDto>();
            dtos = _mapper.Map<List<FieldSetDto>>(entities);
            return dtos;
        }
        public async Task<List<FieldSetDto>> GetAllDtos()
        {
            var entities = await dbContext.FieldSets.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
