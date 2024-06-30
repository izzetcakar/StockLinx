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
    public class LicenseService : Service<License>, ILicenseService
    {
        private readonly ILicenseRepository _licenseRepository;
        private readonly IUserProductRepository _userProductRepository;
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<License> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public LicenseService(
            IRepository<License> repository,
            ILicenseRepository licenseRepository,
            IUserProductRepository userProductRepository,
            IAssetProductRepository assetProductRepository,
            IAssetRepository assetRepository,
            IUserService userService,
            ICustomLogService customLogService,
            IFilterService<License> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _userProductRepository = userProductRepository;
            _assetProductRepository = assetProductRepository;
            _assetRepository = assetRepository;
            _userService = userService;
            _customLogService = customLogService;
            _filterService = filterService;
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
            await CheckTagExistAsync(dto.Tag);
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
            await CheckTagExistAsync(createDtos.Select(dto => dto.Tag).ToList());
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

            int availableQuantity = await _licenseRepository.GetAvaliableQuantityAsync(license);
            if (license.Quantity < availableQuantity)
            {
                throw new Exception(
                    "Quantity must be greater than or equal to the available quantity"
                );
            }

            _licenseRepository.Update(licenseInDb, license);
            await _customLogService.CreateCustomLog("Update", "License", license.Id, license.Name);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task DeleteLicenseAsync(Guid id)
        {
            await _licenseRepository.CanDeleteAsync(id);
            License license = await GetByIdAsync(id);
            _licenseRepository.Remove(license);
            await _customLogService.CreateCustomLog("Delete", "License", license.Id, license.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeLicenseAsync(List<Guid> ids)
        {
            List<License> licenses = new List<License>();
            foreach (Guid id in ids)
            {
                await _licenseRepository.CanDeleteAsync(id);
                License license = await GetByIdAsync(id);
                licenses.Add(license);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "License",
                    license.Id,
                    license.Name
                );
            }
            _licenseRepository.RemoveRange(licenses);
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserProductDto> CheckInAsync(UserProductCheckInDto checkInDto)
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
            return await _userProductRepository.GetDtoAsync(userProduct);
        }

        public async Task<AssetProductDto> CheckInAsync(AssetProductCheckInDto checkInDto)
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
            return await _assetProductRepository.GetDtoAsync(assetProduct);
        }

        public async Task<List<UserProductDto>> UserCheckOutAsync(
            UserProductCheckOutDto checkOutDto
        )
        {
            List<UserProduct> userProducts = new List<UserProduct>();
            UserProduct userProduct = await _userProductRepository.GetByIdAsync(
                checkOutDto.UserProductId
            );
            License license = await GetByIdAsync((Guid)userProduct.LicenseId);
            bool isUserChanged = checkOutDto.UserId != null && checkOutDto.UserId != userProduct.UserId;
            switch (userProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    if (isUserChanged)
                    {
                        userProduct.UserId = (Guid)checkOutDto.UserId;
                        _userProductRepository.Update(userProduct, userProduct);
                        await CreateCheckLogAsync(
                            "CheckOut",
                            license,
                            await _userService.GetByIdAsync((Guid)checkOutDto.UserId),
                            checkOutDto.Quantity
                        );
                        userProducts.Add(userProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                        await _unitOfWork.CommitAsync();
                        _userProductRepository.Remove(userProduct);
                        return await _userProductRepository.GetDtosAsync(userProducts);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _userProductRepository.GetDtosAsync(userProducts);
                case < 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case > 0:
                    userProduct.Quantity -= checkOutDto.Quantity;
                    _userProductRepository.Update(userProduct, userProduct);
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    userProducts.Add(userProduct);
                    if (isUserChanged)
                    {
                        UserProduct newUserProduct = new UserProduct
                        {
                            Id = Guid.NewGuid(),
                            LicenseId = license.Id,
                            UserId = (Guid)checkOutDto.UserId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckOut",
                            license,
                            await _userService.GetByIdAsync((Guid)checkOutDto.UserId),
                            checkOutDto.Quantity
                        );
                        await _userProductRepository.AddAsync(newUserProduct);
                        userProducts.Add(newUserProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _userProductRepository.GetDtosAsync(userProducts);
            }
        }

        public async Task<List<AssetProductDto>> AssetCheckOutAsync(
            AssetProductCheckOutDto checkOutDto
        )
        {
            List<AssetProduct> assetProducts = new List<AssetProduct>();
            AssetProduct assetProduct = await _assetProductRepository.GetByIdAsync(
                checkOutDto.AssetProductId
            );
            License license = await GetByIdAsync((Guid)assetProduct.LicenseId);
            bool isAssetChanged = checkOutDto.AssetId != null && checkOutDto.AssetId != assetProduct.AssetId;
            switch (assetProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    if (isAssetChanged)
                    {
                        assetProduct.AssetId = (Guid)checkOutDto.AssetId;
                        _assetProductRepository.Update(assetProduct, assetProduct);
                        await CreateCheckLogAsync(
                            "CheckOut",
                            license,
                            await _userService.GetByIdAsync((Guid)checkOutDto.AssetId),
                            checkOutDto.Quantity
                        );
                        assetProducts.Add(assetProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                        _assetProductRepository.Remove(assetProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _assetProductRepository.GetDtosAsync(assetProducts);
                case < 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case > 0:
                    assetProduct.Quantity -= checkOutDto.Quantity;
                    _assetProductRepository.Update(assetProduct, assetProduct);
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    assetProducts.Add(assetProduct);
                    if (isAssetChanged)
                    {
                        AssetProduct newAssetProduct = new AssetProduct
                        {
                            Id = Guid.NewGuid(),
                            LicenseId = license.Id,
                            AssetId = (Guid)checkOutDto.AssetId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckOut",
                            license,
                            await _userService.GetByIdAsync((Guid)checkOutDto.AssetId),
                            checkOutDto.Quantity
                        );
                        await _assetProductRepository.AddAsync(newAssetProduct);
                        assetProducts.Add(newAssetProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _assetProductRepository.GetDtosAsync(assetProducts);
            }
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

        public async Task<List<LicenseDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _licenseRepository.GetDtosAsync(result.ToList());
        }

        public async Task CreateCheckLogAsync(
            string action,
            License license,
            User user,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "License",
                license.Id,
                license.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(string action, License license, int quantity)
        {
            await _customLogService.CreateCustomLog(
                action,
                "License",
                license.Id,
                license.Name,
                "Checked " + quantity + " units"
            );
        }
    }
}
