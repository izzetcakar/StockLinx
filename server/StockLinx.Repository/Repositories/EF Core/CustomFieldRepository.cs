using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CustomFieldRepository : Repository<CustomField>, ICustomFieldRepository
    {
        public CustomFieldRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
