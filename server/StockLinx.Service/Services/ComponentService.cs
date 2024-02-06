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
    public class ComponentService : Service<Component>, IComponentService
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IDeployedProductRepository _deployedProductRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ComponentService(IRepository<Component> repository, IComponentRepository componentRepository,
            IDeployedProductRepository deployedProductRepository, IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _componentRepository = componentRepository;
            _deployedProductRepository = deployedProductRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ComponentDto> GetDto(Guid id)
        {
            var component = await GetByIdAsync(id);
            return await _componentRepository.GetDto(component);
        }

        public async Task<List<ComponentDto>> GetAllDtos()
        {
            return await _componentRepository.GetAllDtos();
        }

        public async Task<ComponentDto> CreateComponentAsync(ComponentCreateDto createDto)
        {
            var newComponent = _mapper.Map<Component>(createDto);
            newComponent.Id = Guid.NewGuid();
            newComponent.CreatedDate = DateTime.UtcNow;
            await _componentRepository.AddAsync(newComponent);
            await _customLogService.CreateCustomLog("Create", newComponent.Id, newComponent.BranchId, "Component", "Branch");
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDto(newComponent);
        }

        public async Task<List<ComponentDto>> CreateRangeComponentAsync(List<ComponentCreateDto> createDtos)
        {
            var newComponents = new List<Component>();
            foreach (var createDto in createDtos)
            {
                var newComponent = _mapper.Map<Component>(createDto);
                newComponent.Id = Guid.NewGuid();
                newComponent.CreatedDate = DateTime.UtcNow;
                newComponents.Add(newComponent);
                await _customLogService.CreateCustomLog("Create", newComponent.Id, newComponent.BranchId, "Component", "Branch");
            }
            await _componentRepository.AddRangeAsync(newComponents);
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDtos(newComponents);
        }

        public async Task<ComponentDto> UpdateComponentAsync(ComponentUpdateDto updateDto)
        {
            var componentInDb = await GetByIdAsync(updateDto.Id);
            if (componentInDb == null)
            {
                throw new ArgumentNullException("Component is not found");
            }
            var updatedComponent = _mapper.Map<Component>(updateDto);
            updatedComponent.UpdatedDate = DateTime.UtcNow;
            _componentRepository.Update(componentInDb, updatedComponent);
            await _customLogService.CreateCustomLog("Update", updatedComponent.Id, updatedComponent.BranchId, "Component", "Branch");
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDto(updatedComponent);
        }

        public async Task DeleteComponentAsync(Guid componentId)
        {
            var component = await GetByIdAsync(componentId);
            if (component == null)
            {
                throw new ArgumentNullException("Component is not found");
            }
            component.DeletedDate = DateTime.UtcNow;
            _componentRepository.Update(component, component);
            await _customLogService.CreateCustomLog("Delete", component.Id, component.BranchId, "Component", "Branch");
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeComponentAsync(List<Guid> componentIds)
        {
            var components = new List<Component>();
            foreach (var componentId in componentIds)
            {
                var component = await GetByIdAsync(componentId);
                if (component == null)
                {
                    throw new ArgumentNullException($"{componentId} - Component is not found");
                }
                component.DeletedDate = DateTime.UtcNow;
                components.Add(component);
                await _customLogService.CreateCustomLog("Delete", component.Id, component.BranchId, "Component", "Branch");
            }
            _componentRepository.UpdateRange(components);
            await _unitOfWork.CommitAsync();
        }

        public async Task<ComponentCheckInResponseDto> CheckIn(ComponentCheckInDto checkInDto)
        {
            var component = await _componentRepository.GetByIdAsync(checkInDto.ComponentId);
            if (component == null)
            {
                throw new Exception("Component is not found");
            }
            var deployedProducts = await _deployedProductRepository.GetAll().Where(d => d.DeletedDate == null).ToListAsync();
            var availableQuantity = component.Quantity - deployedProducts.Count(d => d.ComponentId.HasValue && d.ComponentId == component.Id);
            if (availableQuantity < 1)
            {
                throw new Exception("Component is out of stock");
            }
            var deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                ComponentId = checkInDto.ComponentId,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog("CheckIn", component.Id, deployedProduct.UserId, "Component", "User");
            await _unitOfWork.CommitAsync();
            var componentDto = await _componentRepository.GetDto(component);
            var deployedProductDto = await _deployedProductRepository.GetDto(deployedProduct);
            return new ComponentCheckInResponseDto
            {
                Component = componentDto,
                DeployedProduct = deployedProductDto
            };
        }

        public async Task<ComponentDto> CheckOut(Guid id)
        {
            var deployedProduct = await _deployedProductRepository.Where(d => d.ComponentId.HasValue && d.Id == id).SingleOrDefaultAsync();
            if (deployedProduct == null)
            {
                throw new Exception("Deployed product is not found");
            }
            var component = await _componentRepository.GetByIdAsync(deployedProduct.ComponentId);
            if (component == null)
            {
                throw new Exception("Component is not found");
            }
            deployedProduct.DeletedDate = DateTime.UtcNow;
            _deployedProductRepository.Update(deployedProduct, deployedProduct);
            await _customLogService.CreateCustomLog("CheckOut", component.Id, component.BranchId, "Component", "Branch");
            await _unitOfWork.CommitAsync();
            return await _componentRepository.GetDto(component);
        }
    }
}
