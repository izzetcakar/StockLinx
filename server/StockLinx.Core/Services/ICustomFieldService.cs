using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICustomFieldService : IService<CustomField>
    {
        Task<CustomFieldDto> GetDtoAsync(Guid id);
        Task<List<CustomFieldDto>> GetAllDtosAsync();
        Task CreateCustomFieldAsync(CustomFieldCreateDto dto);
        Task CreateRangeCustomFieldAsync(List<CustomFieldCreateDto> dtos);
        Task<CustomFieldDto> UpdateCustomFieldAsync(CustomFieldUpdateDto dto);
        Task DeleteCustomFieldAsync(Guid id);
        Task DeleteRangeCustomFieldAsync(List<Guid> id);
    }
}
