using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ModelRepository : Repository<Model>, IModelRepository
    {
        public ModelRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
