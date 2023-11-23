using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class FieldSetRepository : Repository<FieldSet>, IFieldSetRepository
    {
        public FieldSetRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
