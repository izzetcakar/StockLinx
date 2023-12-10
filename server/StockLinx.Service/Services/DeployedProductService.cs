using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
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
        public DeployedProductService(IRepository<DeployedProduct> repository, IDeployedProductRepository deployedProductRepository, IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _deployedProductRepository = deployedProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<DeployedProductDto> GetDto(Guid id)
        {
            var deployedProduct = await GetByIdAsync(id);
            return _deployedProductRepository.GetDto(deployedProduct);
        }

        public async Task<List<DeployedProductDto>> GetAllDtos()
        {
            return await _deployedProductRepository.GetAllDtos();
        }

        public async Task<DeployedProductDto> CreateDeployedProductAsync(DeployedProductCreateDto createDto)
        {
            var newDeployedProduct = _mapper.Map<DeployedProduct>(createDto);
            newDeployedProduct.Id = Guid.NewGuid();
            newDeployedProduct.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newDeployedProduct);
            return _deployedProductRepository.GetDto(added);
        }

        public async Task<List<DeployedProductDto>> CreateRangeDeployedProductAsync(List<DeployedProductCreateDto> createDtos)
        {
            var newDeployedProducts = new List<DeployedProduct>();
            foreach (var deployedProduct in createDtos)
            {
                var newDeployedProduct = _mapper.Map<DeployedProduct>(deployedProduct);
                newDeployedProduct.Id = Guid.NewGuid();
                newDeployedProduct.CreatedDate = DateTime.UtcNow;
                newDeployedProducts.Add(newDeployedProduct);
            }
            var added = await AddRangeAsync(newDeployedProducts);
            return _deployedProductRepository.GetDtos(added.ToList());
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
