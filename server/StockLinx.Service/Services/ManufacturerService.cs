using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ManufacturerService : Service<Manufacturer>, IManufacturerService
    {
        public ManufacturerService(IRepository<Manufacturer> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
