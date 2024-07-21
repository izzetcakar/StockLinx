using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICustomFieldRepository : IRepository<CustomField>
    {
        Task<CustomFieldDto> GetDtoAsync(CustomField entity);
        Task<List<CustomFieldDto>> GetDtosAsync(List<CustomField> entities);
        Task<List<CustomFieldDto>> GetAllDtosAsync();
    }
}
