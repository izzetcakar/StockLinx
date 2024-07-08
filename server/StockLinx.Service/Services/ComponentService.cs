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
    public class ComponentService : Service<Component>, IComponentService
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IPermissionService _permissionService;
        private readonly IFilterService<Component> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ComponentService(
            IRepository<Component> repository,
            IComponentRepository componentRepository,
            IAssetRepository assetRepository,
            ICompanyRepository companyRepository,
            IAssetProductRepository assetProductRepository,
            ICustomLogService customLogService,
            IPermissionService permissionService,
            IFilterService<Component> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _componentRepository = componentRepository;
            _assetRepository = assetRepository;
            _assetProductRepository = assetProductRepository;
            _companyRepository = companyRepository;
            _customLogService = customLogService;
            _permissionService = permissionService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ComponentDto> GetDtoAsync(Guid id)
        {
            Component component = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(component.CompanyId);
            return await _componentRepository.GetDtoAsync(component);
        }

        public async Task<List<ComponentDto>> GetAllDtosAsync()
        {
            List<Guid> companyIds = await _permissionService.GetCompanyIdsAsync();
            return await _componentRepository.GetAllDtosAsync(companyIds);
        }

        public async Task<ComponentDto> CreateComponentAsync(ComponentCreateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
            await CheckTagExistAsync(dto.Tag);
            Component newComponent = _mapper.Map<Component>(dto);
            await _componentRepository.AddAsync(newComponent);
            await CreateCheckLogAsync(
                "Create",
                newComponent,
                await _companyRepository.GetByIdAsync(newComponent.CompanyId)
            );
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtoAsync(newComponent);
        }

        public async Task<List<ComponentDto>> CreateRangeComponentAsync(
            List<ComponentCreateDto> dtos
        )
        {
            await CheckTagExistAsync(dtos.Select(dto => dto.Tag).ToList());
            List<Component> newAccessories = new List<Component>();
            foreach (ComponentCreateDto dto in dtos)
            {
                await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
                Component newComponent = _mapper.Map<Component>(dto);
                newComponent.Quantity = 1;
                newAccessories.Add(newComponent);
                await CreateCheckLogAsync(
                    "Create",
                    newComponent,
                    await _companyRepository.GetByIdAsync(newComponent.CompanyId)
                );
            }
            await _componentRepository.AddRangeAsync(newAccessories);
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtosAsync(newAccessories);
        }

        public async Task<ComponentDto> UpdateComponentAsync(ComponentUpdateDto dto)
        {
            await _permissionService.VerifyCompanyAccessAsync(dto.CompanyId);
            Component componentInDb = await GetByIdAsync(dto.Id);
            Component component = _mapper.Map<Component>(dto);
            component.UpdatedDate = DateTime.UtcNow;

            int availableQuantity = await _componentRepository.GetAvaliableQuantityAsync(component);
            if (component.Quantity < availableQuantity)
            {
                throw new Exception(
                    "Quantity must be greater than or equal to the available quantity"
                );
            }

            _componentRepository.Update(componentInDb, component);
            await CreateCheckLogAsync("Update", component);
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtoAsync(component);
        }

        public async Task DeleteComponentAsync(Guid id)
        {
            Component component = await GetByIdAsync(id);
            await _permissionService.VerifyCompanyAccessAsync(component.CompanyId);
            await _componentRepository.CanDeleteAsync(id);
            await _customLogService.CreateCustomLog(
                "Delete",
                "Component",
                component.Id,
                component.Name
            );
            _componentRepository.Remove(component);
            await CreateCheckLogAsync("Delete", component);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeComponentAsync(List<Guid> ids)
        {
            List<Component> accessories = new List<Component>();
            foreach (Guid id in ids)
            {
                Component component = await GetByIdAsync(id);
                await _permissionService.VerifyCompanyAccessAsync(component.CompanyId);
                accessories.Add(component);
            }
            foreach (Component component in accessories)
            {
                await _componentRepository.CanDeleteAsync(component.Id);
                await CreateCheckLogAsync("Delete", component);
                _componentRepository.Remove(component);
            }
            await _unitOfWork.CommitAsync();
        }

        public async Task<AssetProductDto> CheckInAsync(AssetProductCheckInDto checkInDto)
        {
            Asset asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
            Component component = await GetByIdAsync(checkInDto.ProductId);
            await _permissionService.VerifyCompanyAccessAsync(component.CompanyId);
            int availableQuantity = await _componentRepository.GetAvaliableQuantityAsync(component);
            if (availableQuantity - checkInDto.Quantity < 0)
            {
                throw new Exception("Component stock is not enough");
            }
            AssetProduct assetProduct = new AssetProduct
            {
                Id = Guid.NewGuid(),
                ComponentId = component.Id,
                AssetId = checkInDto.AssetId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _assetProductRepository.AddAsync(assetProduct);
            await CreateCheckLogAsync("CheckIn", component, asset, checkInDto.Quantity);
            await _unitOfWork.CommitAsync();
            return await _assetProductRepository.GetDtoAsync(assetProduct);
        }

        public async Task<List<AssetProductDto>> CheckOutAsync(AssetProductCheckOutDto checkOutDto)
        {
            List<AssetProduct> assetProducts = new List<AssetProduct>();
            AssetProduct assetProduct = await _assetProductRepository.GetByIdAsync(
                checkOutDto.AssetProductId
            );
            Component component = await GetByIdAsync((Guid)assetProduct.ComponentId);
            await _permissionService.VerifyCompanyAccessAsync(component.CompanyId);
            bool isAssetChanged =
                checkOutDto.AssetId != null && checkOutDto.AssetId != assetProduct.AssetId;
            switch (assetProduct.Quantity - checkOutDto.Quantity)
            {
                case 0:
                    await CreateCheckLogAsync("CheckOut", component, checkOutDto.Quantity);
                    if (isAssetChanged)
                    {
                        assetProduct.AssetId = (Guid)checkOutDto.AssetId;
                        _assetProductRepository.Update(assetProduct, assetProduct);
                        await CreateCheckLogAsync(
                            "CheckIn",
                            component,
                            await _assetRepository.GetByIdAsync((Guid)checkOutDto.AssetId),
                            checkOutDto.Quantity
                        );
                        assetProducts.Add(assetProduct);
                    }
                    else
                    {
                        await CreateCheckLogAsync("CheckOut", component, checkOutDto.Quantity);
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
                    await CreateCheckLogAsync("CheckOut", component, checkOutDto.Quantity);
                    assetProducts.Add(assetProduct);
                    if (isAssetChanged)
                    {
                        AssetProduct newAssetProduct = new AssetProduct
                        {
                            Id = Guid.NewGuid(),
                            ComponentId = component.Id,
                            AssetId = (Guid)checkOutDto.AssetId,
                            AssignDate = DateTime.UtcNow,
                            CreatedDate = DateTime.UtcNow,
                            Quantity = checkOutDto.Quantity,
                            Notes = checkOutDto.Notes,
                        };
                        await CreateCheckLogAsync(
                            "CheckIn",
                            component,
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

        public async Task<List<ComponentDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            var list = await _componentRepository.GetDtosAsync(result.ToList());
            var companyIds = await _permissionService.GetCompanyIdsAsync();
            return list.Where(x => companyIds.Contains(x.CompanyId)).ToList();
        }

        public async Task CreateCheckLogAsync(
            string action,
            Component component,
            Asset asset,
            int quantity
        )
        {
            await _customLogService.CreateCustomLog(
                action,
                "Component",
                component.Id,
                component.Name,
                "Asset",
                asset.Id,
                asset.Tag,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(string action, Component component, int quantity)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Component",
                component.Id,
                component.Name,
                "Checked " + quantity + " units"
            );
        }

        public async Task CreateCheckLogAsync(string action, Component component)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Component",
                component.Id,
                component.Name
            );
        }

        public async Task CreateCheckLogAsync(string action, Component component, Company company)
        {
            await _customLogService.CreateCustomLog(
                action,
                "Component",
                component.Id,
                component.Name,
                "Company",
                company.Id,
                company.Name
            );
        }
    }
}
