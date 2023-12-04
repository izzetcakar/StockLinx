using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class GenericService : Service<User>, IGenericService
    {
        private readonly IGenericRepository _repository;
        public GenericService(IRepository<User> repository, IGenericRepository genericRepository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = genericRepository;
        }

        public IEnumerable<EntityCounter> GetEntityCounts()
        {
            return _repository.GetEntityCounts();
        }
        public IEnumerable<ProductStatusCounter> GetProductStatusCounts()
        {
            return _repository.GetProductStatusCounts();
        }
        public IEnumerable<ProductLocationCounterDto> GetProductLocationCounts()
        {
            return _repository.GetProductLocationCounts();
        }

        public IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts()
        {
            return _repository.GetProductCategoryCounts();
        }
    }
}
