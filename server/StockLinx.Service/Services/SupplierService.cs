using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class SupplierService : Service<Supplier>, ISupplierService
    {
        public SupplierService(IRepository<Supplier> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
