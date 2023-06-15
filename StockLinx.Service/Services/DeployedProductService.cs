using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class DeployedProductService : Service<DeployedProduct>, IDeployedProductService
    {
        public DeployedProductService(IRepository<DeployedProduct> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
