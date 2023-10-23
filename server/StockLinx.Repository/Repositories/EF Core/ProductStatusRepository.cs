using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ProductStatusRepository : Repository<ProductStatus>, IProductStatusRepository
    {
        public ProductStatusRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
