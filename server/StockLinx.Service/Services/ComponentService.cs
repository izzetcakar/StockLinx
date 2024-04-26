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
        private readonly IBranchRepository _branchRepository;
        private readonly IUserService _userService;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ComponentService(
            IRepository<Component> repository,
            IComponentRepository componentRepository,
            IDeployedProductRepository deployedProductRepository,
            IBranchRepository branchRepository,
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
        {
            _componentRepository = componentRepository;
            _deployedProductRepository = deployedProductRepository;
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

        public async Task<DeployedProduct> CheckInAsync(ProductCheckInDto checkInDto)
        {
            User user = await _userService.GetByIdAsync(checkInDto.UserId);
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
            DeployedProduct deployedProduct = new DeployedProduct
            {
                Id = Guid.NewGuid(),
                ComponentId = component.Id,
                UserId = checkInDto.UserId,
                AssignDate = DateTime.UtcNow,
                CreatedDate = DateTime.UtcNow,
                Quantity = checkInDto.Quantity,
                Notes = checkInDto.Notes,
            };
            await _deployedProductRepository.AddAsync(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckIn",
                "Component",
                component.Id,
                component.Name,
                "User",
                user.Id,
                user.FirstName + user.LastName
            );
            await _unitOfWork.CommitAsync();
            return deployedProduct;
        }

        public async Task CheckOutAsync(Guid id)
        {
            DeployedProduct deployedProduct = await _deployedProductRepository.GetByIdAsync(id);
            Component component = await GetByIdAsync((Guid)deployedProduct.ComponentId);
            if (deployedProduct == null || component == null)
            {
                throw new Exception("Deployed product is not found");
            }
            _deployedProductRepository.Remove(deployedProduct);
            await _customLogService.CreateCustomLog(
                "CheckOut",
                "Component",
                component.Id,
                component.Name
            );
            await _unitOfWork.CommitAsync();
        }
    }
}
