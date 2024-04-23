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
        private readonly IUnitOfWork _unitOfWork;
        public GenericService(IRepository<User> repository, IGenericRepository genericRepository, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = genericRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateBaseEntities()
        {
            try
            {
                _repository.CreateBaseEntities();
                await _unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task ClearBaseEntities()
        {
            try
            {
                _repository.ClearBaseEntities();
                await _unitOfWork.CommitAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
