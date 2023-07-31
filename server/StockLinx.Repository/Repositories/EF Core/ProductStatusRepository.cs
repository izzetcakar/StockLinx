using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ProductStatusRepository : Repository<ProductStatus>, IProductStatusRepository
    {
        public ProductStatusRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
