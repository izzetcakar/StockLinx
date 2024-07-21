using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CustomFieldRepository : Repository<CustomField>, ICustomFieldRepository
    {
        private readonly IMapper _mapper;
        public CustomFieldRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<CustomFieldDto> GetDtoAsync(CustomField entity)
        {
            var fieldSetCustomFields = await dbContext.FieldSetCustomFields.Where(x => x.CustomFieldId == entity.Id).ToListAsync();
            var dto = _mapper.Map<CustomFieldDto>(entity);
            dto.FieldSets = fieldSetCustomFields.Select(x => x.FieldSetId).ToList();
            return dto;
        }
        public async Task<List<CustomFieldDto>> GetDtosAsync(List<CustomField> entities)
        {
            List<CustomFieldDto> dtos = new List<CustomFieldDto>();

            foreach (CustomField entity in entities)
            {
                CustomFieldDto dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<CustomFieldDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.CustomFields.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }
    }
}
