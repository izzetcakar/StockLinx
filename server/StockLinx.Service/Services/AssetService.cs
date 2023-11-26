using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class AssetService : Service<Asset>, IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AssetService(IRepository<Asset> repository, IAssetRepository assetRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _assetRepository = assetRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<List<AssetDto>> GetAllAssetDtos()
        {
            return await _assetRepository.GetAllAssetDtos();
        }
        public async Task<List<AssetDto>> CreateAssetAsync(AssetCreateDto createDto)
        {
            var assets = new List<Asset>();
            var newAsset = _mapper.Map<Asset>(createDto);
            newAsset.Id = Guid.NewGuid();
            newAsset.CreatedDate = DateTime.UtcNow;
            assets.Add(newAsset);

            if (createDto.OverageAssets != null && createDto.OverageAssets.Count > 0)
            {
                foreach (var overageAsset in createDto.OverageAssets)
                {
                    var extraAsset = _mapper.Map<Asset>(createDto);
                    extraAsset.Id = Guid.NewGuid();
                    extraAsset.SerialNo = overageAsset.SerialNo;
                    extraAsset.TagNo = overageAsset.TagNo;
                    assets.Add(extraAsset);
                }
            }
            var addedAssets = await AddRangeAsync(assets);
            return await _assetRepository.GetAssetDtos(addedAssets.ToList());
        }

        public async Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> createDtos)
        {
            var newAssets = new List<Asset>();
            foreach (var createDto in createDtos)
            {
                var newAsset = _mapper.Map<Asset>(createDto);
                newAsset.Id = Guid.NewGuid();
                newAsset.CreatedDate = DateTime.UtcNow;
                newAssets.Add(newAsset);
            }
            var addedAssets = await AddRangeAsync(newAssets);
            return await _assetRepository.GetAssetDtos(addedAssets.ToList());
        }

        public async Task UpdateAssetAsync(AssetUpdateDto updateDto)
        {
            var assetInDb = await GetByIdAsync(updateDto.Id);
            if (assetInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the asset to update is null.");
            }
            var updatedAsset = _mapper.Map<Asset>(updateDto);
            updatedAsset.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(assetInDb, updatedAsset);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteAssetAsync(Guid assetId)
        {
            if (assetId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(assetId), $"The ID of the asset to delete is null.");
            }
            var asset = await GetByIdAsync(assetId);
            if (asset == null)
            {
                throw new ArgumentNullException(nameof(asset), $"The asset to delete is null.");
            }
            await RemoveAsync(asset);
        }

        public async Task DeleteRangeAssetAsync(List<Guid> assetIds)
        {
            var assets = new List<Asset>();
            foreach (var assetId in assetIds)
            {
                var asset = GetByIdAsync(assetId).Result;
                assets.Add(asset);
            }
            await RemoveRangeAsync(assets);
        }
        public async Task<ProductCounter> GetAllCountAsync()
        {
            var assets = await GetAllAsync();
            var assetCount = assets.Count();
            return new ProductCounter { EntityName = "Assets", Count = assetCount };
        }
        public async Task<List<ProductStatusCounter>> GetStatusCount()
        {
            var assets = await _assetRepository.GetAll().Include(x => x.ProductStatus).ToListAsync();
            var productStatusCounts = assets
                .Where(asset => asset.ProductStatus != null)
                .GroupBy(asset => asset.ProductStatus.Type)
                .Select(group => new ProductStatusCounter
                {
                    Status = group.Key.ToString(),
                    Count = group.Count()
                })
                .ToList();

            return productStatusCounts;
        }
    }
}
