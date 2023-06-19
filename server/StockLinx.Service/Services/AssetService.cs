using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AssetService : Service<Asset>, IAssetService
    {
        public AssetService(IRepository<Asset> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
