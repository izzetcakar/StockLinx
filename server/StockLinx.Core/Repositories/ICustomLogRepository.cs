using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICustomLogRepository : IRepository<CustomLog>
    {
        public object GetObjById(string entityName, Guid id);
    }
}
