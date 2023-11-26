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

        public FieldSetDto GetFieldSetDto(FieldSet fieldSet)
        {
            var fieldSetDto = _mapper.Map<FieldSetDto>(fieldSet);
            return fieldSetDto;
        }
        public List<FieldSetDto> GetFieldSetDtos(List<FieldSet> fieldSets)
        {
            var fieldSetDtos = new List<FieldSetDto>();
            fieldSetDtos = _mapper.Map<List<FieldSetDto>>(fieldSets);
            return fieldSetDtos;
        }
        public async Task<List<FieldSetDto>> GetAllFieldSetDtos()
        {
            var fieldSets = await dbContext.FieldSets.AsNoTracking().ToListAsync();
            return GetFieldSetDtos(fieldSets);
        }
    }
}
