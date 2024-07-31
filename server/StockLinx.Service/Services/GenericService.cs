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

        public async Task<IEnumerable<EntityCounter>> GetEntityCounts()
        {
            return await _repository.GetEntityCounts();
        }

        public async Task<IEnumerable<ProductStatusCounter>> GetProductStatusCounts()
        {
            return await _repository.GetProductStatusCounts();
        }

        public async Task<IEnumerable<ProductCompanyCounterDto>> GetProductCompanyCounts()
        {
            return await _repository.GetProductCompanyCounts();
        }

        public IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts()
        {
            return _repository.GetProductCategoryCounts();
        }
    }
}
