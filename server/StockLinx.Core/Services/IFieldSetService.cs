using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IFieldSetService : IService<FieldSet>
    {
        Task<FieldSetDto> GetDtoAsync(Guid id);
        Task<List<FieldSetDto>> GetAllDtosAsync();
        Task<FieldSetDto> CreateFieldSetAsync(FieldSetCreateDto dto);
        Task<List<FieldSetDto>> CreateRangeFieldSetAsync(List<FieldSetCreateDto> dtos);
        Task<FieldSetDto> UpdateFieldSetAsync(FieldSetUpdateDto dto);
        Task DeleteFieldSetAsync(Guid id);
        Task DeleteRangeFieldSetAsync(List<Guid> ids);
    }
}
