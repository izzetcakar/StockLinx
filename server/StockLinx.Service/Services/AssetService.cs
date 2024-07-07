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
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmployeeProductRepository _employeeProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<Asset> _filterService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AssetService(
            IRepository<Asset> repository,
            IAssetRepository assetRepository,
            IEmployeeRepository employeeRepository,
            IEmployeeProductRepository employeeProductRepository,
            ICompanyRepository companyRepository,
            IPermissionService permissionService,
            IFilterService<Asset> filterService,
            ICustomLogService customLogService,
            IUnitOfWork unitOfWork,
            IMapper mapper
        )
            : base(repository, unitOfWork)
        {
            _assetRepository = assetRepository;
            _employeeRepository = employeeRepository;
            _employeeProductRepository = employeeProductRepository;
            _companyRepository = companyRepository;
            _permissionService = permissionService;
            _filterService = filterService;
            _customLogService = customLogService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<AssetDto> GetDtoAsync(Guid id)
        {
            Asset asset = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(asset.CompanyId);
            return _assetRepository.GetDto(asset);
        }

        public async Task<List<AssetDto>> GetAllDtosAsync()
        {
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return await _assetRepository.GetAllDtosAsync(companyIds);
        }

        public async Task<AssetDto> CreateAssetAsync(AssetCreateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
                await _permissionService.VerifyCompanyAccessAsync(createDto.CompanyId);
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
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
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
            Asset asset = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(asset.CompanyId);
            await _assetRepository.CanDeleteAsync(id);
            _assetRepository.Remove(asset);

            await _customLogService.CreateCustomLog("Delete", "Asset", asset.Id, asset.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeAssetAsync(List<Guid> ids)
        {
            List<Asset> assets = new List<Asset>();
            foreach (Guid id in ids)
            {
                Asset asset = await GetByIdAsync(id);
                await _permissionService.VerifyCompanyAccessAsync(asset.CompanyId);
                await _assetRepository.CanDeleteAsync(id);
                assets.Add(asset);
                await _customLogService.CreateCustomLog("Delete", "Asset", asset.Id, asset.Tag);
            }
            _assetRepository.RemoveRange(assets);
            await _unitOfWork.CommitAsync();
        }

        public async Task<EmployeeProductDto> CheckInAsync(AssetCheckInDto checkInDto)
        {
            Employee employee = await _employeeRepository.GetByIdAsync(checkInDto.EmployeeId);
            Asset asset = await GetByIdAsync(checkInDto.AssetId);
            await _permissionService.VerifyCompanyAccessAsync(asset.CompanyId);
            bool isDeployed = await _employeeProductRepository.AnyAsync(x => x.AssetId == asset.Id);
            if (isDeployed)
            {
                throw new Exception("Asset is already deployed");
            }

            EmployeeProduct employeeProduct = new EmployeeProduct
            {
                Id = Guid.NewGuid(),
                AssetId = asset.Id,
                EmployeeId = checkInDto.EmployeeId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = 1,
                Notes = checkInDto.Notes,
            };
            await _employeeProductRepository.AddAsync(employeeProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Asset",
                asset.Id,
                asset.Tag,
                "Employee",
                employee.Id,
                employee.FirstName + employee.LastName
            );
            asset.ProductStatusId = checkInDto.ProductStatusId;
            await _unitOfWork.CommitAsync();
            return await _employeeProductRepository.GetDtoAsync(employeeProduct);
        }

        public async Task<EmployeeProductDto> CheckOutAsync(AssetCheckOutDto checkOutDto)
        {
            EmployeeProduct employeeProduct = await _employeeProductRepository.GetByIdAsync(
                checkOutDto.EmployeeProductId
            );
            Asset asset = await GetByIdAsync((Guid)employeeProduct.AssetId);
            await _permissionService.VerifyCompanyAccessAsync(asset.CompanyId);
            bool isEmployeeChanged = checkOutDto.EmployeeId != null && checkOutDto.EmployeeId != employeeProduct.EmployeeId;
            asset.ProductStatusId = checkOutDto.ProductStatusId;
            _assetRepository.Update(asset, asset);
            if (isEmployeeChanged)
            {
                var employee = await _employeeRepository.GetByIdAsync((Guid)checkOutDto.EmployeeId);
                employeeProduct.EmployeeId = employee.Id;
                _employeeProductRepository.Update(employeeProduct, employeeProduct);
                await _customLogService.CreateCustomLog(
                    "CheckOut",
                    "Asset",
                    asset.Id,
                    asset.Tag,
                    "Employee",
                    employee.Id,
                    employee.FirstName + " " + employee.LastName,
                    checkOutDto.Notes ?? "Asset is checked out"
                    );
                await _unitOfWork.CommitAsync();
                return await _employeeProductRepository.GetDtoAsync(employeeProduct);
            }
            else
            {
                await _customLogService.CreateCustomLog(
                    "CheckOut",
                    "Asset",
                    asset.Id,
                    asset.Tag,
                    checkOutDto.Notes ?? "Asset is checked out"
                );
                _employeeProductRepository.Remove(employeeProduct);
                await _unitOfWork.CommitAsync();
                return null;
            }

        }

        public async Task<List<AssetDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            var list = _assetRepository.GetDtos(result.ToList());
            var companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(x => companyIds.Contains(x.CompanyId)).ToList();
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
