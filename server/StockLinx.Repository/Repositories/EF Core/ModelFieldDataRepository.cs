using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ModelFieldDataRepository : Repository<ModelFieldData>, IModelFieldDataRepository
    {
        public ModelFieldDataRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
