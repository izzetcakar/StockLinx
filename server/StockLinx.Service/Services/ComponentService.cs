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
    public class ComponentService : Service<Component>, IComponentService
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IAssetRepository _assetRepository;
        private readonly IAssetProductRepository _assetProductRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ComponentService(
            IRepository<Component> repository,
            IComponentRepository componentRepository,
            IAssetRepository assetRepository,
            IAssetProductRepository assetProductRepository,
            IBranchRepository branchRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _componentRepository = componentRepository;
            _assetRepository = assetRepository;
            _assetProductRepository = assetProductRepository;
            _branchRepository = branchRepository;
            _userService = userService;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ComponentDto> GetDtoAsync(Guid id)
        {
            Component component = await GetByIdAsync(id);
            if (component == null)
            {
                throw new Exception("Component is not found");
            }
            return await _componentRepository.GetDtoAsync(component);
        }

        public async Task<List<ComponentDto>> GetAllDtosAsync()
        {
            return await _componentRepository.GetAllDtosAsync();
        }

        public async Task<ComponentDto> CreateComponentAsync(ComponentCreateDto dto)
        {
            Component component = _mapper.Map<Component>(dto);
            component.Id = Guid.NewGuid();
            component.CreatedDate = DateTime.UtcNow;
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
            List<Component> components = new List<Component>();
            foreach (ComponentCreateDto createDto in createDtos)
            {
                Component component = _mapper.Map<Component>(createDto);
                component.Id = Guid.NewGuid();
                component.CreatedDate = DateTime.UtcNow;
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
            if (componentInDb == null)
            {
                throw new Exception("Component is not found");
            }
            Component component = _mapper.Map<Component>(dto);
            component.UpdatedDate = DateTime.UtcNow;
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
            if (component == null)
            {
                throw new Exception("Component is not found");
            }
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
                if (component == null)
                {
                    throw new Exception($"{id} - Component is not found");
                }
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

        public async Task<AssetProduct> CheckInAsync(AssetProductCheckInDto checkInDto)
        {
            Asset asset = await _assetRepository.GetByIdAsync(checkInDto.AssetId);
            if (asset == null)
            {
                throw new Exception("Asset not found");
            }
            Component component = await GetByIdAsync(checkInDto.ProductId);
            if (component == null)
            {
                throw new Exception("Component not found");
            }
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
            return assetProduct;
        }

        public async Task CheckOutAsync(AssetProductCheckOutDto checkOutDto)
        {
            AssetProduct assetProduct = await _assetProductRepository.GetByIdAsync(
                checkOutDto.AssetProductId
            );
            Component component = await GetByIdAsync(checkOutDto.ProductId);
            if (assetProduct == null || component == null)
            {
                throw new Exception("Component product is not found");
            }
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
                        "Component",
                        component.Id,
                        component.Name,
                        checkOutDto.Notes ?? "Ckecked Out " + checkOutDto.Quantity + " units"
                    );
                    break;
            }

            await _unitOfWork.CommitAsync();
        }
    }
}
