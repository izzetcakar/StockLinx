using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class FieldSetCustomFieldRepository
        : Repository<FieldSetCustomField>,
            IFieldSetCustomFieldRepository
    {
        private readonly IMapper _mapper;

        public FieldSetCustomFieldRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public FieldSetCustomFieldDto GetDto(FieldSetCustomField entity)
        {
            return _mapper.Map<FieldSetCustomFieldDto>(entity);
        }

        public List<FieldSetCustomFieldDto> GetDtos(List<FieldSetCustomField> entities)
        {
            var dtos = new List<FieldSetCustomFieldDto>();
            dtos = _mapper.Map<List<FieldSetCustomFieldDto>>(entities);
            return dtos;
        }

        public async Task<List<FieldSetCustomFieldDto>> GetAllDtos()
        {
            var items = await dbContext.FieldSetCustomFields.AsNoTracking().ToListAsync();
            return GetDtos(items);
        }
    }
}
