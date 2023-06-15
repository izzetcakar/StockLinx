using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ComponentService : Service<Component>, IComponentService
    {
        public ComponentService(IRepository<Component> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
