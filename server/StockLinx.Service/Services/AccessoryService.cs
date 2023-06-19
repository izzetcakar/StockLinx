using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AccessoryService : Service<Accessory>, IAccessoryService
    {
        public AccessoryService(IRepository<Accessory> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
