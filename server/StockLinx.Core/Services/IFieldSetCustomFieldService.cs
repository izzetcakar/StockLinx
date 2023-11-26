using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IFieldSetCustomFieldService : IService<FieldSetCustomField>
    {
        Task<List<FieldSetCustomFieldDto>> GetAllFieldSetCustomFieldDtos();
        Task<FieldSetCustomFieldDto> CreateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto);
        Task<List<FieldSetCustomFieldDto>> CreateRangeFieldSetCustomFieldAsync(List<FieldSetCustomFieldDto> dtos);
        Task UpdateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto);
        Task DeleteFieldSetCustomFieldAsync(Guid id);
        Task DeleteRangeFieldSetCustomFieldAsync(List<Guid> ids);
        Task SynchronizeFieldSetCustomFieldsAsync(List<FieldSetCustomFieldDto> dtos);
    }
}
