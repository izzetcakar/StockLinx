using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class FieldSetCustomFieldRepository : Repository<FieldSetCustomField>, IFieldSetCustomFieldRepository
    {
        public FieldSetCustomFieldRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
