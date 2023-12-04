using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IFieldSetCustomFieldService : IService<FieldSetCustomField>
    {
        Task<FieldSetCustomFieldDto> GetDto(Guid id);
        Task<List<FieldSetCustomFieldDto>> GetAllDtos();
        Task<FieldSetCustomFieldDto> CreateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto);
        Task<List<FieldSetCustomFieldDto>> CreateRangeFieldSetCustomFieldAsync(List<FieldSetCustomFieldDto> dtos);
        Task UpdateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto);
        Task DeleteFieldSetCustomFieldAsync(Guid id);
        Task DeleteRangeFieldSetCustomFieldAsync(List<Guid> ids);
        Task SynchronizeFieldSetCustomFieldsAsync(List<FieldSetCustomFieldDto> dtos);
    }
}
