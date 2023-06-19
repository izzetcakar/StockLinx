using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ConsumableRepository : Repository<Consumable>, IConsumableRepository
    {
        public ConsumableRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
