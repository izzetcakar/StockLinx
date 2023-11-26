using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class FieldSetCustomFieldRepository : Repository<FieldSetCustomField>, IFieldSetCustomFieldRepository
    {
        private readonly IMapper _mapper;
        public FieldSetCustomFieldRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<List<FieldSetCustomFieldDto>> GetAllFieldSetCustomFieldDtos()
        {
            var items = await dbContext.FieldSetCustomFields.AsNoTracking().ToListAsync();
            return GetFieldSetCustomFieldDtos(items);
        }

        public FieldSetCustomFieldDto GetFieldSetCustomFieldDto(FieldSetCustomField fieldSetCustomField)
        {
            return _mapper.Map<FieldSetCustomFieldDto>(fieldSetCustomField);
        }

        public List<FieldSetCustomFieldDto> GetFieldSetCustomFieldDtos(List<FieldSetCustomField> fieldSetCustomFields)
        {
            var dtos = new List<FieldSetCustomFieldDto>();
            dtos = _mapper.Map<List<FieldSetCustomFieldDto>>(fieldSetCustomFields);
            return dtos;
        }
    }
}
