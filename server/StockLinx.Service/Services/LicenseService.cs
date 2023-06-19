using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class LicenseService : Service<License>, ILicenseService
    {
        public LicenseService(IRepository<License> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
