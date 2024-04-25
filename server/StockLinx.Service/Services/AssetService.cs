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
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AssetService(
            IRepository<Asset> repository,
            IAssetRepository assetRepository,
            IDeployedProductRepository deployedProductRepository,
            IBranchRepository branchRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _assetRepository = assetRepository;
            _deployedProductRepository = deployedProductRepository;
            _branchRepository = branchRepository;
            _userService = userService;
            _customLogService = customLogService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<AssetDto> GetDtoAsync(Guid id)
        {
            Asset asset = await GetByIdAsync(id);
            return _assetRepository.GetDto(asset);
        }

        public async Task<List<AssetDto>> GetAllDtosAsync()
        {
            return await _assetRepository.GetAllDtosAsync();
        }

        public async Task<List<AssetDto>> CreateAssetAsync(AssetCreateDto dto)
        {
            List<Asset> newAssets = new List<Asset>();
            Asset newAsset = _mapper.Map<Asset>(dto);
            Branch branch = await _branchRepository.GetByIdAsync(newAsset.BranchId);
            newAsset.Id = Guid.NewGuid();
            newAsset.CreatedDate = DateTime.UtcNow;
            newAssets.Add(newAsset);
            await _customLogService.CreateCustomLog("Create", "Asset", newAsset.Name, "Branch", branch.Name);

            if (newAsset.ImagePath != null)
            {
                if (newAsset.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(newAsset.ImagePath, $"{newAsset.Id}", "Assets");
                    newAsset.ImagePath = $"Assets/{newAsset.Id}.jpg";
                }
            }

            if (dto.OverageAssets != null && dto.OverageAssets.Count > 0)
            {
                foreach (OverageAssetDto overageAsset in dto.OverageAssets)
                {
                    var extraAsset = _mapper.Map<Asset>(dto);
                    extraAsset.Id = Guid.NewGuid();
                    extraAsset.SerialNo = overageAsset.SerialNo;
                    extraAsset.TagNo = overageAsset.TagNo;
                    extraAsset.CreatedDate = DateTime.UtcNow;
                    extraAsset.ImagePath = newAsset.ImagePath;
                    newAssets.Add(extraAsset);
                    await _customLogService.CreateCustomLog("Create", "Asset", extraAsset.Name, "Branch", branch.Name);
                }
            }
            await _assetRepository.AddRangeAsync(newAssets);
            await _unitOfWork.CommitAsync();
            return _assetRepository.GetDtos(newAssets);
        }

        public async Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> dtos)
        {
            List<Asset> newAssets = new List<Asset>();
            Branch branch = await _branchRepository.GetByIdAsync(dtos[0].BranchId);
            foreach (AssetCreateDto createDto in dtos)
            {
                Asset newAsset = _mapper.Map<Asset>(createDto);
                newAsset.Id = Guid.NewGuid();
                newAsset.CreatedDate = DateTime.UtcNow;
                newAssets.Add(newAsset);
                await _customLogService.CreateCustomLog("Create", "Asset", newAsset.Name, "Branch", branch.Name);
            }
            await _assetRepository.AddRangeAsync(newAssets);
            await _unitOfWork.CommitAsync();
            return _assetRepository.GetDtos(newAssets);
        }

        public async Task<AssetDto> UpdateAssetAsync(AssetUpdateDto dto)
        {
            var assetInDb = await GetByIdAsync(dto.Id);
            if (assetInDb == null)
            {
                throw new ArgumentNullException("Asset is not found");
            }
            Asset asset = _mapper.Map<Asset>(dto);
            asset.UpdatedDate = DateTime.UtcNow;

            if (asset.ImagePath != null)
            {
                if (asset.ImagePath.Contains("base64,"))
                {
                    ImageHandler.UploadBase64AsJpg(
                        asset.ImagePath,
                        $"{asset.Id}",
                        "Assets"
                    );
                    asset.ImagePath = $"Assets/{asset.Id}.jpg";
                }
            }

            _assetRepository.Update(assetInDb, asset);
            await _customLogService.CreateCustomLog("Update", "Asset", asset.Name);
            await _unitOfWork.CommitAsync();
            return _assetRepository.GetDto(asset);
        }

        public async Task DeleteAssetAsync(Guid id)
        {
            var asset = await GetByIdAsync(id);
            if (asset == null)
            {
                throw new ArgumentNullException("Asset is not found");
            }
            bool canDelete = await _assetRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                _assetRepository.Remove(asset);
            }
            await _customLogService.CreateCustomLog("Delete", "Asset", asset.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAssetAsync(List<Guid> ids)
        {
            List<Asset> assets = new List<Asset>();
            foreach (Guid id in ids)
            {
                var asset = await GetByIdAsync(id);
                if (asset == null)
                {
                    throw new ArgumentNullException("Asset is not found");
                }
                bool canDelete = await _assetRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    assets.Add(asset);
                    await _customLogService.CreateCustomLog("Delete", "Asset", asset.Name);
                }
            }
            _assetRepository.RemoveRange(assets);
            await _unitOfWork.CommitAsync();
        }

        public async Task<DeployedProductDto> CheckInAsync(ProductCheckInDto checkInDto)
        {
            bool isDeployed = await _deployedProductRepository.AnyAsync(d =>
                d.AssetId == checkInDto.ProductId
            );
            if (isDeployed)
            {
                throw new Exception("Asset is already checked in");
            }
            User user = await _userService.GetCurrentUser();
            var asset = await _assetRepository.GetByIdAsync(checkInDto.ProductId);
            if (asset == null)
            {
                throw new Exception("Asset not found");
            }
            DeployedProduct deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                AssetId = checkInDto.ProductId,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Notes = checkInDto.Notes,
                Quantity = 1,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog("CheckIn", "Asset", asset.Name, "User", user.FirstName + user.LastName);
            await _unitOfWork.CommitAsync();
            DeployedProductDto deployedProductDto = await _deployedProductRepository.GetDtoAsync(deployedProduct);
            return deployedProductDto;
        }

        public async Task CheckOutAsync(Guid id)
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                throw new Exception("Asset is not found");
            }
            List<DeployedProduct> deployedProducts = await _deployedProductRepository.GetAll().Where(dp => dp.AssetId == id).ToListAsync();
            var deployedProduct = deployedProducts.Find(dp => dp.AssetId == id);
            if (deployedProduct == null)
            {
                throw new Exception("Asset is already checked out");
            }
            _deployedProductRepository.Remove(deployedProduct);
            await _customLogService.CreateCustomLog("CheckOut", "Asset", deployedProduct.Asset.Name);
            await _unitOfWork.CommitAsync();
        }
    }
}