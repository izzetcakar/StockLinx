using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class LocationService : Service<Location>, ILocationService
    {
        public LocationService(IRepository<Location> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
