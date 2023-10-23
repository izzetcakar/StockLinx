using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class BranchRepository : Repository<Branch>, IBranchRepository
    {
        public BranchRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
