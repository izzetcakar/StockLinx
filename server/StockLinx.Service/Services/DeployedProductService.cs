using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class DeployedProductService : Service<DeployedProduct>, IDeployedProductService
    {
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public DeployedProductService(IRepository<DeployedProduct> repository, IDeployedProductRepository deployedProductRepository,IMapper mapper,IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _deployedProductRepository = deployedProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task CreateDeployedProductAsync(DeployedProductCreateDto createDto)
        {
            var newDeployedProduct = _mapper.Map<DeployedProduct>(createDto);
            newDeployedProduct.Id = Guid.NewGuid();
            newDeployedProduct.CreatedDate = DateTime.UtcNow;
            await AddAsync(newDeployedProduct);
        }
        public async Task UpdateDeployedProductAsync(DeployedProductUpdateDto updateDto)
        {
            var deployedProductInDb = await GetByIdAsync(updateDto.Id);
            if (deployedProductInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the DeployedProduct to update is null.");
            }
            var updatedDeployedProduct = _mapper.Map<DeployedProduct>(updateDto);
            updatedDeployedProduct.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(deployedProductInDb, updatedDeployedProduct);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteDeployedProductAsync(Guid deployedProductId)
        {
            if (deployedProductId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(deployedProductId), "The ID of the DeployedProduct to delete is null.");
            }
            var DeployedProduct = await GetByIdAsync(deployedProductId);
            if (DeployedProduct == null)
            {
                throw new ArgumentNullException(nameof(DeployedProduct), "The DeployedProduct to delete is null.");
            }
            await RemoveAsync(DeployedProduct);
        }
    }
}
