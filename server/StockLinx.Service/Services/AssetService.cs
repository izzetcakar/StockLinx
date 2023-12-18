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
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public AssetService(IRepository<Asset> repository, IAssetRepository assetRepository, IDeployedProductRepository deployedProductRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _assetRepository = assetRepository;
            _deployedProductRepository = deployedProductRepository;
            _customLogService = customLogService;
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
            var newAssets = new List<Asset>();
            var newAsset = _mapper.Map<Asset>(createDto);
            newAsset.Id = Guid.NewGuid();
            newAsset.CreatedDate = DateTime.UtcNow;
            newAssets.Add(newAsset);
            await _customLogService.CreateCustomLog("Create", newAsset.Id, newAsset.BranchId, "Asset", "Branch");

            if (newAsset.ImagePath != null)
            {
                if (newAsset.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(newAsset.ImagePath, $"{newAsset.Id}", "Assets");
                    newAsset.ImagePath = $"Assets/{newAsset.Id}.jpg";
                }
            }

            if (createDto.OverageAssets != null && createDto.OverageAssets.Count > 0)
            {
                foreach (var overageAsset in createDto.OverageAssets)
                {
                    var extraAsset = _mapper.Map<Asset>(createDto);
                    extraAsset.Id = Guid.NewGuid();
                    extraAsset.SerialNo = overageAsset.SerialNo;
                    extraAsset.TagNo = overageAsset.TagNo;
                    extraAsset.CreatedDate = DateTime.UtcNow;
                    extraAsset.ImagePath = newAsset.ImagePath;
                    newAssets.Add(extraAsset);
                    await _customLogService.CreateCustomLog("Create", extraAsset.Id, extraAsset.BranchId, "Asset", "Branch");
                }
            }
            await _assetRepository.AddRangeAsync(newAssets);
            await _unitOfWork.CommitAsync();
            return await _assetRepository.GetDtos(newAssets);
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
                await _customLogService.CreateCustomLog("Create", newAsset.Id, newAsset.BranchId, "Asset", "Branch");
            }
            await _assetRepository.AddRangeAsync(newAssets);
            await _unitOfWork.CommitAsync();
            return await _assetRepository.GetDtos(newAssets);
        }

        public async Task<AssetDto> UpdateAssetAsync(AssetUpdateDto updateDto)
        {
            var assetInDb = await GetByIdAsync(updateDto.Id);
            if (assetInDb == null)
            {
                throw new ArgumentNullException("Asset is not found");
            }
            var updatedAsset = _mapper.Map<Asset>(updateDto);
            updatedAsset.UpdatedDate = DateTime.UtcNow;

            if (updatedAsset.ImagePath != null)
            {
                if (updatedAsset.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(updatedAsset.ImagePath, $"{updatedAsset.Id}", "Assets");
                    updatedAsset.ImagePath = $"Assets/{updatedAsset.Id}.jpg";
                }
            }

            _assetRepository.Update(assetInDb, updatedAsset);
            await _customLogService.CreateCustomLog("Update", updatedAsset.Id, updatedAsset.BranchId, "Asset", "Branch");
            await _unitOfWork.CommitAsync();
            return await _assetRepository.GetDto(updatedAsset);
        }

        public async Task DeleteAssetAsync(Guid assetId)
        {
            var asset = await GetByIdAsync(assetId);
            if (asset == null)
            {
                throw new ArgumentNullException("Asset is not found");
            }
            asset.DeletedDate = DateTime.UtcNow;
            _assetRepository.Update(asset, asset);
            await _customLogService.CreateCustomLog("Delete", asset.Id, asset.BranchId, "Asset", "Branch");
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAssetAsync(List<Guid> assetIds)
        {
            var assets = new List<Asset>();
            foreach (var assetId in assetIds)
            {
                var asset = await GetByIdAsync(assetId);
                if (asset == null)
                {
                    throw new ArgumentNullException($"{assetId} - Asset is not found");
                }
                asset.DeletedDate = DateTime.UtcNow;
                assets.Add(asset);
                await _customLogService.CreateCustomLog("Delete", asset.Id, asset.BranchId, "Asset", "Branch");
            }
            _assetRepository.UpdateRange(assets);
            await _unitOfWork.CommitAsync();
        }

        public async Task<AssetCheckInResponseDto> CheckIn(AssetCheckInDto checkInDto)
        {
            var asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
            if (asset == null)
            {
                throw new Exception("Asset not found");
            }
            Boolean isDeployed = await _deployedProductRepository.AnyAsync(d => d.AssetId == checkInDto.Id);
            if (isDeployed)
            {
                throw new Exception("Asset is already checked in");
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
            await _customLogService.CreateCustomLog("Check In", asset.Id, deployedProduct.UserId, "Asset", "User");
            await _unitOfWork.CommitAsync();
            var assetDto = await _assetRepository.GetDto(asset);
            var deployedProductDto = _deployedProductRepository.GetDto(deployedProduct);
            return new AssetCheckInResponseDto
            {
                Asset = assetDto,
                DeployedProduct = deployedProductDto
            };
        }

        public async Task<AssetDto> CheckOut(Guid id)
        {
            var deployedProduct = await _deployedProductRepository.GetByIdAsync(id);
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            var asset = await _assetRepository.GetByIdAsync(deployedProduct.AssetId);
            if (asset == null)
            {
                throw new Exception("Asset is not found");
            }
            deployedProduct.DeletedDate = DateTime.UtcNow;
            _deployedProductRepository.Update(deployedProduct, deployedProduct);
            await _customLogService.CreateCustomLog("Check Out", asset.Id, asset.BranchId, "Asset", "Branch");
            await _unitOfWork.CommitAsync();
            return await _assetRepository.GetDto(asset);
        }
    }
}
