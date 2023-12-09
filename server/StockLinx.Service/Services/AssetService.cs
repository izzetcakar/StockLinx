using AutoMapper;
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
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public AssetService(IRepository<Asset> repository, IAssetRepository assetRepository, IDeployedProductRepository deployedProductRepository,
            IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _assetRepository = assetRepository;
            _deployedProductRepository = deployedProductRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<AssetDto> GetDto(Guid id)
        {
            var asset = await GetByIdAsync(id);
            return await _assetRepository.GetDto(asset);
        }

        public async Task<List<AssetDto>> GetAllDtos()
        {
            return await _assetRepository.GetAllDtos();
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
            return await _assetRepository.GetDtos(addedAssets.ToList());
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
            return await _assetRepository.GetDtos(addedAssets.ToList());
        }

        public async Task<AssetDto> UpdateAssetAsync(AssetUpdateDto updateDto)
        {
            var assetInDb = await GetByIdAsync(updateDto.Id);
            if (assetInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the asset to update is null.");
            }
            var updatedAsset = _mapper.Map<Asset>(updateDto);
            updatedAsset.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(assetInDb, updatedAsset);
            var asset = await GetByIdAsync(updateDto.Id);
            return await _assetRepository.GetDto(asset);
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

        public async Task<AssetCheckInResponseDto> CheckIn(AssetCheckInDto checkInDto)
        {
            try
            {
                var asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
                if (asset == null)
                {
                    throw new Exception("Asset not found");
                }
                Boolean isDeployed = await _deployedProductRepository.AnyAsync(d => d.AssetId == checkInDto.Id);
                if (isDeployed)
                {
                    throw new Exception("Asset is already deployed");
                }
                var deployedProduct = new DeployedProduct
                {
                    Id = Guid.NewGuid(),
                    AssetId = checkInDto.AssetId,
                    UserId = checkInDto.UserId,
                    AssignDate = DateTime.UtcNow,
                    CreatedDate = DateTime.UtcNow,
                    Notes = checkInDto.Notes,
                };
                await _deployedProductRepository.AddAsync(deployedProduct);
                var assetDto = await _assetRepository.GetDto(asset);
                var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
                await _unitOfWork.CommitAsync();
                return new AssetCheckInResponseDto
                {
                    Asset = assetDto,
                    DeployedProduct = deployedProductDto
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AssetDto> CheckOut(Guid id)
        {
            try
            {
                var deployedProduct = await _deployedProductRepository.GetByIdAsync(id);
                if (deployedProduct == null)
                {
                    throw new Exception("Deployed product is not found");
                }
                _deployedProductRepository.Remove(deployedProduct);
                var asset = await _assetRepository.GetByIdAsync(deployedProduct.AssetId);
                if (asset == null)
                {
                    throw new Exception("Asset is not found");
                }
                var assetDto = await _assetRepository.GetDto(asset);
                await _unitOfWork.CommitAsync();
                return assetDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
