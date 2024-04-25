using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IFieldSetCustomFieldRepository : IRepository<FieldSetCustomField>
    {
        FieldSetCustomFieldDto GetDto(FieldSetCustomField entity);
        List<FieldSetCustomFieldDto> GetDtos(List<FieldSetCustomField> entities);
        Task<List<FieldSetCustomFieldDto>> GetAllDtosAsync();
    }
}
