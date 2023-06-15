using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ComponentRepository : Repository<Component>, IComponentRepository
    {
        public ComponentRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
