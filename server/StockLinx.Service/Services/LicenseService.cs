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
    public class LicenseService : Service<License>, ILicenseService
    {
        private readonly ILicenseRepository _licenseRepository;
        private readonly IUserProductRepository _userProductRepository;
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public LicenseService(
            IRepository<License> repository,
            ILicenseRepository licenseRepository,
            IUserProductRepository userProductRepository,
            IAssetProductRepository assetProductRepository,
            IAssetRepository assetRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _userProductRepository = userProductRepository;
            _assetProductRepository = assetProductRepository;
            _assetRepository = assetRepository;
            _userService = userService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<LicenseDto> GetDtoAsync(Guid id)
        {
            License license = await GetByIdAsync(id);
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task<List<LicenseDto>> GetAllDtosAsync()
        {
            return await _licenseRepository.GetAllDtosAsync();
        }

        public async Task<LicenseDto> CreateLicenseAsync(LicenseCreateDto dto)
        {
            await _licenseRepository.CheckTagExistAsync(dto.Tag);
            License license = _mapper.Map<License>(dto);
            await _licenseRepository.AddAsync(license);
            await _customLogService.CreateCustomLog("Create", "License", license.Id, license.Name);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task<List<LicenseDto>> CreateRangeLicenseAsync(
            List<LicenseCreateDto> createDtos
        )
        {
            await _licenseRepository.CheckTagExistAsync(createDtos.Select(dto => dto.Tag).ToList());
            List<License> licenses = new List<License>();
            foreach (LicenseCreateDto createDto in createDtos)
            {
                License license = _mapper.Map<License>(createDto);
                licenses.Add(license);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "License",
                    license.Id,
                    license.Name
                );
            }
            await _licenseRepository.AddRangeAsync(licenses);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtosAsync(licenses);
        }

        public async Task<LicenseDto> UpdateLicenseAsync(LicenseUpdateDto dto)
        {
            License licenseInDb = await GetByIdAsync(dto.Id);
            License license = _mapper.Map<License>(dto);
            license.UpdatedDate = DateTime.UtcNow;
            _licenseRepository.Update(licenseInDb, license);
            await _customLogService.CreateCustomLog("Update", "License", license.Id, license.Name);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task DeleteLicenseAsync(Guid id)
        {
            License license = await GetByIdAsync(id);
            bool canDelete = await _licenseRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                _licenseRepository.Remove(license);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "License",
                    license.Id,
                    license.Name
                );
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeLicenseAsync(List<Guid> ids)
        {
            List<License> licenses = new List<License>();
            foreach (Guid id in ids)
            {
                bool canDelete = await _licenseRepository.CanDeleteAsync(id);
                License license = await GetByIdAsync(id);
                if (canDelete)
                {
                    licenses.Add(license);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "License",
                        license.Id,
                        license.Name
                    );
                }
            }
            _licenseRepository.RemoveRange(licenses);
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserProduct> CheckInAsync(UserProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
            License license = await GetByIdAsync(checkInDto.ProductId);
            int availableQuantity = await _licenseRepository.GetAvaliableQuantityAsync(license);
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("License stock is not enough");
            }
            UserProduct userProduct = new UserProduct
            {
                Id = Guid.NewGuid(),
                LicenseId = license.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _userProductRepository.AddAsync(userProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "License",
                license.Id,
                license.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName,
                "Checked In " + checkInDto.Quantity + " units"
            );
            await _unitOfWork.CommitAsync();
            return userProduct;
        }

        public async Task<AssetProduct> CheckInAsync(AssetProductCheckInDto checkInDto)
        {
            Asset asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
            License license = await GetByIdAsync(checkInDto.ProductId);
            int availableQuantity = await _licenseRepository.GetAvaliableQuantityAsync(license);
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("License stock is not enough");
            }
            AssetProduct assetProduct = new AssetProduct
            {
                Id = Guid.NewGuid(),
                LicenseId = license.Id,
                AssetId = checkInDto.AssetId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _assetProductRepository.AddAsync(assetProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "License",
                license.Id,
                license.Name,
                "Asset",
                asset.Id,
                asset.Name,
                "Checked In " + checkInDto.Quantity + " units"
            );
            await _unitOfWork.CommitAsync();
            return assetProduct;
        }

        public async Task UserCheckOutAsync(UserProductCheckOutDto checkOutDto)
        {
            UserProduct userProduct = await _userProductRepository.GetByIdAsync(
                checkOutDto.UserProductId
            );
            License license = await _licenseRepository.GetByIdAsync(checkOutDto.ProductId);
            switch (checkOutDto.Quantity - userProduct.Quantity)
            {
                case 0:
                    _userProductRepository.Remove(userProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "License",
                        license.Id,
                        license.Name,
                        checkOutDto.Notes ?? "Checked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case < 0:
                    UserProduct newUserProduct = userProduct;
                    newUserProduct.Quantity -= checkOutDto.Quantity;
                    _userProductRepository.Update(userProduct, newUserProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "License",
                        license.Id,
                        license.Name,
                        checkOutDto.Notes ?? "Checked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
            }

            await _unitOfWork.CommitAsync();
        }

        public async Task AssetCheckOutAsync(AssetProductCheckOutDto checkOutDto)
        {
            AssetProduct assetProduct = await _assetProductRepository.GetByIdAsync(
                checkOutDto.AssetProductId
            );
            License license = await _licenseRepository.GetByIdAsync(checkOutDto.ProductId);
            switch (checkOutDto.Quantity - assetProduct.Quantity)
            {
                case 0:
                    _assetProductRepository.Remove(assetProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "License",
                        license.Id,
                        license.Name,
                        checkOutDto.Notes ?? "Checked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case < 0:
                    AssetProduct newAssetProduct = assetProduct;
                    newAssetProduct.Quantity -= checkOutDto.Quantity;
                    _assetProductRepository.Update(assetProduct, newAssetProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "License",
                        license.Id,
                        license.Name,
                        checkOutDto.Notes ?? "Checked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
            }
            await _unitOfWork.CommitAsync();
        }
    }
}
