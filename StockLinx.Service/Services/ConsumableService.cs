using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ConsumableService : Service<Consumable>, IConsumableService
    {
        public ConsumableService(IRepository<Consumable> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
