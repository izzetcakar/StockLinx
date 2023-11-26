using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICustomFieldRepository : IRepository<CustomField>
    {
        CustomFieldDto GetCustomFieldDto(CustomField customField);
        List<CustomFieldDto> GetCustomFieldDtos(List<CustomField> customFields);
        Task<List<CustomFieldDto>> GetAllCustomFieldDtos();
        Task CreateCustomField(CustomFieldCreateDto dto);
    }
}
