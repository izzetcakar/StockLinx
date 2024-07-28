using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<License> _filterService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public LicenseService(
            IRepository<License> repository,
            ILicenseRepository licenseRepository,
            IEmployeeRepository employeeRepository,
            IEmployeeProductRepository employeeProductRepository,
            IAssetProductRepository assetProductRepository,
            IAssetRepository assetRepository,
            ICompanyRepository companyRepository,
            IPermissionService permissionService,
            IFilterService<License> filterService,
            ICustomLogService customLogService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _licenseRepository = licenseRepository;
            _employeeRepository = employeeRepository;
            _employeeProductRepository = employeeProductRepository;
            _assetProductRepository = assetProductRepository;
            _assetRepository = assetRepository;
            _companyRepository = companyRepository;
            _permissionService = permissionService;
            _filterService = filterService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<LicenseDto> GetDtoAsync(Guid id)
        {
            License license = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
            return await _licenseRepository.GetDtoAsync(license);
        }

        public async Task<List<LicenseDto>> GetAllDtosAsync()
        {
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return await _licenseRepository.GetAllDtosAsync(companyIds);
        }

        public async Task<LicenseDto> CreateLicenseAsync(LicenseCreateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
            await CheckTagExistAsync(dto.Tag);
            License license = _mapper.Map<License>(dto);
            await _licenseRepository.AddAsync(license);
            await CreateCheckLogAsync(
                "Create",
                license,
                await _companyRepository.GetByIdAsync(dto.CompanyId)
            );
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
                await _permissionService.VerifyCompanyAccessAsync(createDto.CompanyId);
                License license = _mapper.Map<License>(createDto);
                licenses.Add(license);
                await CreateCheckLogAsync(
                    "Create",
                    license,
                    await _companyRepository.GetByIdAsync(createDto.CompanyId)
                );
            }
            await _licenseRepository.AddRangeAsync(licenses);
            await _unitOfWork.CommitAsync();
            return await _licenseRepository.GetDtosAsync(licenses);
        }

        public async Task<LicenseDto> UpdateLicenseAsync(LicenseUpdateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
            License license = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
            await _licenseRepository.CanDeleteAsync(id);
            _licenseRepository.Remove(license);
            await _customLogService.CreateCustomLog("Delete", "License", license.Id, license.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeLicenseAsync(List<Guid> ids)
        {
            List<License> licenses = new List<License>();
            foreach (Guid id in ids)
            {
                License license = await GetByIdAsync(id);
                await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
                await _licenseRepository.CanDeleteAsync(id);
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

        public async Task<EmployeeProductDto> CheckInAsync(EmployeeProductCheckInDto checkInDto)
        {
            Employee employee = await _employeeRepository.GetByIdAsync(checkInDto.EmployeeId);
            License license = await GetByIdAsync(checkInDto.ProductId);
            await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
            int availableQuantity = await _licenseRepository.GetAvaliableQuantityAsync(license);
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("License stock is not enough");
            }
            EmployeeProduct employeeProduct = new EmployeeProduct
            {
                Id = Guid.NewGuid(),
                LicenseId = license.Id,
                EmployeeId = checkInDto.EmployeeId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _employeeProductRepository.AddAsync(employeeProduct);
            await CreateCheckLogAsync("CheckIn", license, employee, checkInDto.Quantity);
            await _unitOfWork.CommitAsync();
            return await _employeeProductRepository.GetDtoAsync(employeeProduct);
        }

        public async Task<AssetProductDto> CheckInAsync(AssetProductCheckInDto checkInDto)
        {
            Asset asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
            License license = await GetByIdAsync(checkInDto.ProductId);
            await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
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
            await CreateCheckLogAsync("CheckIn", license, asset, checkInDto.Quantity);
            await _unitOfWork.CommitAsync();
            return await _assetProductRepository.GetDtoAsync(assetProduct);
        }

        public async Task<List<EmployeeProductDto>> EmployeeCheckOutAsync(
            EmployeeProductCheckOutDto checkOutDto
        )
        {
            List<EmployeeProduct> employeeProducts = new List<EmployeeProduct>();
            EmployeeProduct employeeProduct = await _employeeProductRepository.GetByIdAsync(
                checkOutDto.EmployeeProductId
            );
            License license = await GetByIdAsync((Guid)employeeProduct.LicenseId);
            await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
            bool isEmployeeChanged =
                checkOutDto.EmployeeId != null
                && checkOutDto.EmployeeId != employeeProduct.EmployeeId;
            switch (employeeProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    if (isEmployeeChanged)
                    {
                        employeeProduct.EmployeeId = (Guid)checkOutDto.EmployeeId;
                        _employeeProductRepository.Update(employeeProduct, employeeProduct);
                        await CreateCheckLogAsync(
                            "CheckIn",
                            license,
                            await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId),
                            checkOutDto.Quantity
                        );
                        employeeProducts.Add(employeeProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                        _employeeProductRepository.Remove(employeeProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    ;
                    return await _employeeProductRepository.GetDtosAsync(employeeProducts);
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case < 0:
                    employeeProduct.Quantity -= checkOutDto.Quantity;
                    _employeeProductRepository.Update(employeeProduct, employeeProduct);
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    employeeProducts.Add(employeeProduct);
                    if (isEmployeeChanged)
                    {
                        EmployeeProduct newEmployeeProduct = new EmployeeProduct
                        {
                            Id = Guid.NewGuid(),
                            LicenseId = license.Id,
                            EmployeeId = (Guid)checkOutDto.EmployeeId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckIn",
                            license,
                            await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId),
                            checkOutDto.Quantity
                        );
                        await _employeeProductRepository.AddAsync(newEmployeeProduct);
                        employeeProducts.Add(newEmployeeProduct);
                    }
                    await _unitOfWork.CommitAsync();
                    return await _employeeProductRepository.GetDtosAsync(employeeProducts);
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
            await _permissionService.VerifyCompanyAccessAsync(license.CompanyId);
            bool isAssetChanged =
                checkOutDto.AssetId != null && checkOutDto.AssetId != assetProduct.AssetId;
            switch (assetProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", license, checkOutDto.Quantity);
                    if (isAssetChanged)
                    {
                        assetProduct.AssetId = (Guid)checkOutDto.AssetId;
                        _assetProductRepository.Update(assetProduct, assetProduct);
                        await CreateCheckLogAsync(
                            "CheckIn",
                            license,
                            await _assetRepository.GetByIdAsync((Guid)checkOutDto.AssetId),
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
                    ;
                    return await _assetProductRepository.GetDtosAsync(assetProducts);
                case > 0:
                    throw new Exception(
                        "Quantity must be less than or equal to the quantity in stock"
                    );
                case < 0:
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
                            "CheckIn",
                            license,
                            await _assetRepository.GetByIdAsync((Guid)checkOutDto.AssetId),
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
            var list = await _licenseRepository.GetDtosAsync(result.ToList());
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(x => companyIds.Contains(x.CompanyId)).ToList();
        }

        public async Task CreateCheckLogAsync(
            string action,
            License license,
            Employee employee,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "License",
                license.Id,
                license.Name,
                "Employee",
                employee.Id,
                employee.FirstName + employee.LastName,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(
            string action,
            License license,
            Asset asset,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "License",
                license.Id,
                license.Name,
                "Employee",
                asset.Id,
                asset.Tag,
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

        public async Task CreateCheckLogAsync(string action, License license)
        {
            await _customLogService.CreateCustomLog(action, "License", license.Id, license.Name);
        }

        public async Task CreateCheckLogAsync(string action, License license, Company company)
        {
            await _customLogService.CreateCustomLog(
                action,
                "License",
                license.Id,
                license.Name,
                "Company",
                company.Id,
                company.Name
            );
        }

        public async Task<List<LicenseDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            return await _licenseRepository.GetDisplayDtos(ids);
        }
    }
}
