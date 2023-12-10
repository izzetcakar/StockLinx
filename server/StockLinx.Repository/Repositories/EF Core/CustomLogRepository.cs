using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CustomLogRepository : Repository<CustomLog>, ICustomLogRepository
    {
        public CustomLogRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
