using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class LicenseRepository : Repository<License>, ILicenseRepository
    {
        public LicenseRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
    }
}
