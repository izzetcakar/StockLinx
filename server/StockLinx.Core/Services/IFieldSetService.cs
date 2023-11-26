using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IFieldSetService : IService<FieldSet>
    {
        Task<List<FieldSetDto>> GetAllDtos();
        Task<FieldSetDto> CreateFieldSetAsync(FieldSetCreateDto createDto);
        Task<List<FieldSetDto>> CreateRangeFieldSetAsync(List<FieldSetCreateDto> createDtos);
        Task UpdateFieldSetAsync(FieldSetUpdateDto updateDto);
        Task DeleteFieldSetAsync(Guid fieldSetId);
        Task DeleteRangeFieldSetAsync(List<Guid> fieldSetIds);
    }
}
