using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AssetProductService : Service<AssetProduct>, IAssetProductService
    {
        private readonly IAssetProductRepository _AssetProductRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AssetProductService(
            IRepository<AssetProduct> repository,
            IAssetProductRepository AssetProductRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _AssetProductRepository = AssetProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<AssetProductDto> GetDtoAsync(Guid id)
        {
            AssetProduct AssetProduct = await GetByIdAsync(id);
            if (AssetProduct == null)
            {
                throw new Exception("AssetProduct is not found");
            }
            return await _AssetProductRepository.GetDtoAsync(AssetProduct);
        }

        public async Task<List<AssetProductDto>> GetAllDtosAsync()
        {
            return await _AssetProductRepository.GetAllDtosAsync();
        }

        public async Task<AssetProductDto> CreateAssetProductAsync(AssetProductCreateDto dto)
        {
            AssetProduct AssetProduct = _mapper.Map<AssetProduct>(dto);
            AssetProduct.Id = Guid.NewGuid();
            AssetProduct.CreatedDate = DateTime.UtcNow;
            await _AssetProductRepository.AddAsync(AssetProduct);
            await _unitOfWork.CommitAsync();
            return await _AssetProductRepository.GetDtoAsync(AssetProduct);
        }

        public async Task<List<AssetProductDto>> CreateRangeAssetProductAsync(
            List<AssetProductCreateDto> dtos
        )
        {
            List<AssetProduct> AssetProducts = new List<AssetProduct>();
            foreach (AssetProductCreateDto dto in dtos)
            {
                AssetProduct AssetProduct = _mapper.Map<AssetProduct>(dto);
                AssetProduct.Id = Guid.NewGuid();
                AssetProduct.CreatedDate = DateTime.UtcNow;
                AssetProducts.Add(AssetProduct);
            }
            await _AssetProductRepository.AddRangeAsync(AssetProducts);
            await _unitOfWork.CommitAsync();
            return await _AssetProductRepository.GetDtosAsync(AssetProducts);
        }

        public async Task DeleteAssetProductAsync(Guid id)
        {
            AssetProduct AssetProduct = await GetByIdAsync(id);
            if (AssetProduct == null)
            {
                throw new Exception("AssetProduct is not found.");
            }
            _AssetProductRepository.Remove(AssetProduct);
            await _unitOfWork.CommitAsync();
        }
    }
}
