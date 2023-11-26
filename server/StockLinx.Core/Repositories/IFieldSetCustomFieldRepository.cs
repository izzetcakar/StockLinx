using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IFieldSetCustomFieldRepository : IRepository<FieldSetCustomField>
    {
        Task<List<FieldSetCustomFieldDto>> GetAllFieldSetCustomFieldDtos();
        FieldSetCustomFieldDto GetFieldSetCustomFieldDto(FieldSetCustomField fieldSetCustomField);
        List<FieldSetCustomFieldDto> GetFieldSetCustomFieldDtos(List<FieldSetCustomField> fieldSetCustomFields);
    }
}
