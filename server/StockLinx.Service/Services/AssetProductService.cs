using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AssetProductService : Service<AssetProduct>, IAssetProductService
    {
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly IFilterService<AssetProduct> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AssetProductService(
            IRepository<AssetProduct> repository,
            IAssetProductRepository assetProductRepository,
            IFilterService<AssetProduct> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _assetProductRepository = assetProductRepository;
            _mapper = mapper;
            _filterService = filterService;
            _unitOfWork = unitOfWork;
        }

        public async Task<AssetProductDto> GetDtoAsync(Guid id)
        {
            AssetProduct AssetProduct = await GetByIdAsync(id);
            return await _assetProductRepository.GetDtoAsync(AssetProduct);
        }

        public async Task<List<AssetProductDto>> GetAllDtosAsync()
        {
            return await _assetProductRepository.GetAllDtosAsync();
        }

        public async Task<AssetProductDto> CreateAssetProductAsync(AssetProductCreateDto dto)
        {
            AssetProduct AssetProduct = _mapper.Map<AssetProduct>(dto);
            await _assetProductRepository.AddAsync(AssetProduct);
            await _unitOfWork.CommitAsync();
            return await _assetProductRepository.GetDtoAsync(AssetProduct);
        }

        public async Task<List<AssetProductDto>> CreateRangeAssetProductAsync(
            List<AssetProductCreateDto> dtos
        )
        {
            List<AssetProduct> AssetProducts = new List<AssetProduct>();
            foreach (AssetProductCreateDto dto in dtos)
            {
                AssetProduct AssetProduct = _mapper.Map<AssetProduct>(dto);
                AssetProducts.Add(AssetProduct);
            }
            await _assetProductRepository.AddRangeAsync(AssetProducts);
            await _unitOfWork.CommitAsync();
            return await _assetProductRepository.GetDtosAsync(AssetProducts);
        }

        public async Task DeleteAssetProductAsync(Guid id)
        {
            AssetProduct AssetProduct = await GetByIdAsync(id);
            _assetProductRepository.Remove(AssetProduct);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<AssetProductDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _assetProductRepository.GetDtosAsync(result.ToList());
        }

        public async Task<List<AssetProductDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _assetProductRepository.GetDisplayDtos(ids);
        }
    }
}
