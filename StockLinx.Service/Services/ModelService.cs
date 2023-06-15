using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ModelService : Service<Model>, IModelService
    {
        public ModelService(IRepository<Model> repository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
        }
    }
}
