using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
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

        public async Task CreateCustomField(CustomFieldCreateDto dto)
        {
            var newCustomField = _mapper.Map<CustomField>(dto);
            var fcToAdd = new List<FieldSetCustomField>();
            newCustomField.Id = Guid.NewGuid();
            newCustomField.CreatedDate = DateTime.UtcNow;
            await dbContext.AddAsync(newCustomField);
            foreach (var fieldSetCustomFieldDto in dto.FieldSetCustomFields)
            {
                var newFieldSetCustomField = _mapper.Map<FieldSetCustomField>(fieldSetCustomFieldDto);
                newFieldSetCustomField.Id = Guid.NewGuid();
                newFieldSetCustomField.CreatedDate = DateTime.UtcNow;
                newFieldSetCustomField.CustomFieldId = newCustomField.Id;
                fcToAdd.Add(newFieldSetCustomField);
            }
            await dbContext.AddRangeAsync(fcToAdd);
        }
        public CustomFieldDto GetDto(CustomField entity)
        {
            return _mapper.Map<CustomFieldDto>(entity);
        }
        public List<CustomFieldDto> GetDtos(List<CustomField> entities)
        {
            var dtos = new List<CustomFieldDto>();
            dtos = _mapper.Map<List<CustomFieldDto>>(entities);
            return dtos;
        }
        public async Task<List<CustomFieldDto>> GetAllDtos()
        {
            var entities = await dbContext.CustomFields.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
