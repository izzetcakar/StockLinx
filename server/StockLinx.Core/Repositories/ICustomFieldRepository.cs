using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICustomFieldRepository : IRepository<CustomField>
    {
        CustomFieldDto GetDto(CustomField entity);
        List<CustomFieldDto> GetDtos(List<CustomField> entities);
        Task<List<CustomFieldDto>> GetAllDtosAsync();
    }
}
