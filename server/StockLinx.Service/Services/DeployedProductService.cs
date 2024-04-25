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

        public DeployedProductService(
            IRepository<DeployedProduct> repository,
            IDeployedProductRepository deployedProductRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _deployedProductRepository = deployedProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<DeployedProductDto> GetDtoAsync(Guid id)
        {
            DeployedProduct deployedProduct = await GetByIdAsync(id);
            if (deployedProduct == null)
            {
                throw new Exception("DeployedProduct is not found");
            }
            return await _deployedProductRepository.GetDtoAsync(deployedProduct);
        }

        public async Task<List<DeployedProductDto>> GetAllDtosAsync()
        {
            return await _deployedProductRepository.GetAllDtosAsync();
        }

        public async Task<DeployedProductDto> CreateDeployedProductAsync(
            DeployedProductCreateDto dto
        )
        {
            DeployedProduct deployedProduct = _mapper.Map<DeployedProduct>(dto);
            deployedProduct.Id = Guid.NewGuid();
            deployedProduct.CreatedDate = DateTime.UtcNow;
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _unitOfWork.CommitAsync();
            return await _deployedProductRepository.GetDtoAsync(deployedProduct);
        }

        public async Task<List<DeployedProductDto>> CreateRangeDeployedProductAsync(
            List<DeployedProductCreateDto> dtos
        )
        {
            List<DeployedProduct> deployedProducts = new List<DeployedProduct>();
            foreach (DeployedProductCreateDto dto in dtos)
            {
                DeployedProduct deployedProduct = _mapper.Map<DeployedProduct>(dto);
                deployedProduct.Id = Guid.NewGuid();
                deployedProduct.CreatedDate = DateTime.UtcNow;
                deployedProducts.Add(deployedProduct);
            }
            await _deployedProductRepository.AddRangeAsync(deployedProducts);
            await _unitOfWork.CommitAsync();
            return await _deployedProductRepository.GetDtosAsync(deployedProducts);
        }

        public async Task DeleteDeployedProductAsync(Guid id)
        {
            DeployedProduct deployedProduct = await GetByIdAsync(id);
            if (deployedProduct == null)
            {
                throw new Exception("DeployedProduct is not found.");
            }
            _deployedProductRepository.Remove(deployedProduct);
            await _unitOfWork.CommitAsync();
        }
    }
}
