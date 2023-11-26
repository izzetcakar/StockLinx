using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICustomFieldRepository : IRepository<CustomField>
    {
        Task CreateCustomField(CustomFieldCreateDto dto);
    }
}
