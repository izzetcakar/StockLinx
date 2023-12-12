using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICustomLogRepository : IRepository<CustomLog>
    {
        Task<string> GetObjByIdAsync(string entityName, Guid id);
    }
}
