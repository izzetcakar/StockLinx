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
        public CustomFieldDto GetCustomFieldDto(CustomField customField)
        {
            var customFieldDto = _mapper.Map<CustomFieldDto>(customField);
            return customFieldDto;
        }
        public List<CustomFieldDto> GetCustomFieldDtos(List<CustomField> customFields)
        {
            var customFieldDtos = new List<CustomFieldDto>();
            customFieldDtos = _mapper.Map<List<CustomFieldDto>>(customFields);
            return customFieldDtos;
        }
        public async Task<List<CustomFieldDto>> GetAllCustomFieldDtos()
        {
            var customFields = await dbContext.CustomFields.AsNoTracking().ToListAsync();
            return GetCustomFieldDtos(customFields);
        }
    }
}
