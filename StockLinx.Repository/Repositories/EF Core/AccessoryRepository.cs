using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class AccessoryRepository : Repository<Accessory>, IAccessoryRepository
    {
        public AccessoryRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
