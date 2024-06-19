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

namespace StockLinx.Service.Services
{
    public class ComponentService : Service<Component>, IComponentService
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<Component> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ComponentService(
            IRepository<Component> repository,
            IComponentRepository componentRepository,
            IAssetRepository assetRepository,
            IAssetProductRepository assetProductRepository,
            ICompanyRepository companyRepository,
            IUserService userService,
            ICustomLogService customLogService,
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
            _userService = userService;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ComponentDto> GetDtoAsync(Guid id)
        {
            Component component = await GetByIdAsync(id);
            return await _componentRepository.GetDtoAsync(component);
        }

        public async Task<List<ComponentDto>> GetAllDtosAsync()
        {
            return await _componentRepository.GetAllDtosAsync();
        }

        public async Task<ComponentDto> CreateComponentAsync(ComponentCreateDto dto)
        {
            await CheckTagExistAsync(dto.Tag);
            Component component = _mapper.Map<Component>(dto);
            await _componentRepository.AddAsync(component);
            await _customLogService.CreateCustomLog(
                "Create",
                "Component",
                component.Id,
                component.Name
            );
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtoAsync(component);
        }

        public async Task<List<ComponentDto>> CreateRangeComponentAsync(
            List<ComponentCreateDto> createDtos
        )
        {
            await CheckTagExistAsync(createDtos.Select(x => x.Tag).ToList());
            List<Component> components = new List<Component>();
            foreach (ComponentCreateDto createDto in createDtos)
            {
                Component component = _mapper.Map<Component>(createDto);
                components.Add(component);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "Component",
                    component.Id,
                    component.Name
                );
            }
            await _componentRepository.AddRangeAsync(components);
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtosAsync(components);
        }

        public async Task<ComponentDto> UpdateComponentAsync(ComponentUpdateDto dto)
        {
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
            await _customLogService.CreateCustomLog(
                "Update",
                "Component",
                component.Id,
                component.Name
            );
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtoAsync(component);
        }

        public async Task DeleteComponentAsync(Guid id)
        {
            Component component = await GetByIdAsync(id);
            bool canDelete = await _componentRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                _componentRepository.Remove(component);
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "Component",
                    component.Id,
                    component.Name
                );
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeComponentAsync(List<Guid> ids)
        {
            List<Component> components = new List<Component>();
            foreach (Guid id in ids)
            {
                Component component = await GetByIdAsync(id);
                bool canDelete = await _componentRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    components.Add(component);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "Component",
                        component.Id,
                        component.Name
                    );
                }
            }
            _componentRepository.RemoveRange(components);
            await _unitOfWork.CommitAsync();
        }

        public async Task<AssetProductDto> CheckInAsync(AssetProductCheckInDto checkInDto)
        {
            Asset asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
            Component component = await GetByIdAsync(checkInDto.ProductId);
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
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Component",
                component.Id,
                component.Name,
                "Asset",
                asset.Id,
                asset.Name,
                "Checked In " + checkInDto.Quantity + " units"
            );
            await _unitOfWork.CommitAsync();
            return await _assetProductRepository.GetDtoAsync(assetProduct);
        }

        public async Task<AssetProductDto> CheckOutAsync(AssetProductCheckOutDto checkOutDto)
        {
            AssetProduct assetProduct = await _assetProductRepository.GetByIdAsync(
                checkOutDto.AssetProductId
            );
            Component component = await GetByIdAsync(checkOutDto.ProductId);
            switch (checkOutDto.Quantity - assetProduct.Quantity)
            {
                case 0:
                    _assetProductRepository.Remove(assetProduct);
                    await _customLogService.CreateCustomLog(
                        "CheckOut",
                        "Component",
                        component.Id,
                        component.Name,
                        checkOutDto.Notes ?? "Ckecked Out " + checkOutDto.Quantity + " units"
                    );
                    await _unitOfWork.CommitAsync();
                    return null;
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
                        "Component",
                        component.Id,
                        component.Name,
                        checkOutDto.Notes ?? "Ckecked Out " + checkOutDto.Quantity + " units"
                    );
                    await _unitOfWork.CommitAsync();
                    return await _assetProductRepository.GetDtoAsync(newAssetProduct);
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
            return await _componentRepository.GetDtosAsync(result.ToList());
        }
    }
}
