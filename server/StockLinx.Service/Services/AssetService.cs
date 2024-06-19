﻿using AutoMapper;
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
        private readonly IUserProductRepository _userProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Asset> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AssetService(
            IRepository<Asset> repository,
            IAssetRepository assetRepository,
            IUserProductRepository userProductRepository,
            ICompanyRepository companyRepository,
            IUserService userService,
            ICustomLogService customLogService,
            IFilterService<Asset> filterService,
            IUnitOfWork unitOfWork,
            IMapper mapper
        )
            : base(repository, unitOfWork)
        {
            _assetRepository = assetRepository;
            _userProductRepository = userProductRepository;
            _companyRepository = companyRepository;
            _userService = userService;
            _customLogService = customLogService;
            _filterService = filterService;
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

        public async Task<AssetDto> CreateAssetAsync(AssetCreateDto dto)
        {
            await CheckTagExistAsync(dto.Tag);
            Asset newAsset = _mapper.Map<Asset>(dto);
            Company company = await _companyRepository.GetByIdAsync(newAsset.CompanyId);
            await _customLogService.CreateCustomLog(
                "Create",
                "Asset",
                newAsset.Id,
                newAsset.Tag,
                "Company",
                company.Id,
                company.Tag
            );

            if (newAsset.ImagePath != null)
            {
                if (newAsset.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(newAsset.ImagePath, $"{newAsset.Id}", "Assets");
                    newAsset.ImagePath = $"Assets/{newAsset.Id}.jpg";
                }
            }
            await _customLogService.CreateCustomLog(
                "Create",
                "Asset",
                newAsset.Id,
                newAsset.Tag,
                "Company",
                company.Id,
                company.Tag
            );
            await _unitOfWork.CommitAsync();
            return _assetRepository.GetDto(newAsset);
        }

        public async Task<List<AssetDto>> CreateRangeAssetAsync(List<AssetCreateDto> dtos)
        {
            await CheckTagExistAsync(dtos.Select(x => x.Tag).ToList());
            List<Asset> newAssets = new List<Asset>();
            Company company = await _companyRepository.GetByIdAsync(dtos[0].CompanyId);
            foreach (AssetCreateDto createDto in dtos)
            {
                Asset newAsset = _mapper.Map<Asset>(createDto);
                newAssets.Add(newAsset);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Asset",
                    newAsset.Id,
                    newAsset.Tag,
                    "Company",
                    company.Id,
                    company.Tag
                );
            }
            await _assetRepository.AddRangeAsync(newAssets);
            await _unitOfWork.CommitAsync();
            return _assetRepository.GetDtos(newAssets);
        }

        public async Task<AssetDto> UpdateAssetAsync(AssetUpdateDto dto)
        {
            Asset assetInDb = await GetByIdAsync(dto.Id);
            Asset asset = _mapper.Map<Asset>(dto);
            asset.UpdatedDate = DateTime.UtcNow;

            if (asset.ImagePath != null)
            {
                if (asset.ImagePath.Contains("base64,"))
                {
                    ImageUtils.UploadBase64AsJpg(asset.ImagePath, $"{asset.Id}", "Assets");
                    asset.ImagePath = $"Assets/{asset.Id}.jpg";
                }
            }

            _assetRepository.Update(assetInDb, asset);
            await _customLogService.CreateCustomLog("Update", "Asset", asset.Id, asset.Name);
            await _unitOfWork.CommitAsync();
            return _assetRepository.GetDto(asset);
        }

        public async Task DeleteAssetAsync(Guid id)
        {
            await _assetRepository.CanDeleteAsync(id);
            Asset asset = await GetByIdAsync(id);
            _assetRepository.Remove(asset);

            await _customLogService.CreateCustomLog("Delete", "Asset", asset.Id, asset.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAssetAsync(List<Guid> ids)
        {
            List<Asset> assets = new List<Asset>();
            foreach (Guid id in ids)
            {
                await _assetRepository.CanDeleteAsync(id);
                Asset asset = await GetByIdAsync(id);
                assets.Add(asset);
                await _customLogService.CreateCustomLog("Delete", "Asset", asset.Id, asset.Tag);
            }
            _assetRepository.RemoveRange(assets);
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserProductDto> CheckInAsync(AssetCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            Asset asset = await GetByIdAsync(checkInDto.AssetId);
            bool isDeployed = await _userProductRepository.AnyAsync(x => x.AssetId == asset.Id);
            if (isDeployed)
            {
                throw new Exception("Asset is already deployed");
            }

            UserProduct userProduct = new UserProduct
            {
                Id = Guid.NewGuid(),
                AssetId = asset.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = 1,
                Notes = checkInDto.Notes,
            };
            await _userProductRepository.AddAsync(userProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Asset",
                asset.Id,
                asset.Tag,
                "User",
                user.Id,
                user.FirstName + user.LastName
            );
            asset.ProductStatusId = checkInDto.ProductStatusId;
            await _unitOfWork.CommitAsync();
            return await _userProductRepository.GetDtoAsync(userProduct);
        }

        public async Task CheckOutAsync(AssetCheckOutDto checkOutDto)
        {
            UserProduct userProduct = await _userProductRepository.GetByIdAsync(
                checkOutDto.UserProductId
            );
            Asset asset = await GetByIdAsync((Guid)userProduct.AssetId);
            _userProductRepository.Remove(userProduct);
            await _customLogService.CreateCustomLog(
                "CheckOut",
                "Asset",
                asset.Id,
                asset.Tag,
                checkOutDto.Notes ?? "Asset is checked out"
            );
            asset.ProductStatusId = checkOutDto.ProductStatusId;
            _assetRepository.Update(asset, asset);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<AssetDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _assetRepository.GetDtos(result.ToList());
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public async Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = await Where(d => tags.Contains(d.Tag));
            if (existingTags.Count() > 0)
            {
                var existingTagNames = existingTags.Select(x => x.Tag).ToList();
                throw new Exception($"Tags {string.Join("\n", existingTagNames)} already exist.");
            }
        }
    }
}
