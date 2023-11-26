using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICustomFieldService : IService<CustomField>
    {
        Task<List<CustomFieldDto>> GetAllCustomFieldDtos();
        Task CreateCustomFieldAsync(CustomFieldCreateDto createDto);
        Task CreateRangeCustomFieldAsync(List<CustomFieldCreateDto> createDtos);
        Task UpdateCustomFieldAsync(CustomFieldUpdateDto updateDto);
        Task DeleteCustomFieldAsync(Guid customFieldId);
        Task DeleteRangeCustomFieldAsync(List<Guid> customFieldIds);
    }
}
