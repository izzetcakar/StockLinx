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
using StockLinx.Repository.Repositories.EF_Core;
using StockLinx.Repository.UnitOfWork;

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
        public async Task<List<AssetDto>> GetAssetDtos()
        {
            var assets = await _assetRepository.GetAll().Include(x => x.Branch)
            .Select(x => new AssetDto
            {
                Id = x.Id,
                CompanyId = x.Branch.CompanyId,
                BranchId = x.BranchId,
                CategoryId = x.CategoryId,
                ProductStatusId = x.ProductStatusId,
                Name = x.Name,
                ImagePath = x.ImagePath,
                SerialNo = x.SerialNo,
                OrderNo = x.OrderNo,
                Notes = x.Notes,
                PurchaseDate = x.PurchaseDate,
                PurchaseCost = x.PurchaseCost,
                CheckinCounter = x.CheckinCounter,
                CheckoutCounter = x.CheckoutCounter,
                ManufacturerId = x.ManufacturerId,
                ModelId = x.ModelId,
                TagNo = x.TagNo,
                CreatedDate = x.CreatedDate,
                UpdatedDate = x.UpdatedDate,
            }).ToListAsync();
            return assets;
        }
        public async Task CreateAssetAsync(AssetCreateDto createDto)
        {
            var newAsset = _mapper.Map<Asset>(createDto);
            newAsset.Id = Guid.NewGuid();
            newAsset.CreatedDate = DateTime.UtcNow;

            //Check if newAsset.ImagePath is base64 or not and not null
            if (newAsset.ImagePath != null && newAsset.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newAsset.ImagePath.Substring(newAsset.ImagePath.IndexOf(',') + 1);
                string path = newAsset.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newAsset);
        }
        public async Task UpdateAssetAsync(AssetUpdateDto updateDto)
        {
            var assetInDb = await GetByIdAsync(updateDto.Id);
            if (assetInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Asset to update is null.");
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
                throw new ArgumentNullException(nameof(assetId), "The ID of the Asset to delete is null.");
            }
            var Asset = await GetByIdAsync(assetId);
            if (Asset == null)
            {
                throw new ArgumentNullException(nameof(Asset), "The Asset to delete is null.");
            }
            await RemoveAsync(Asset);
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
