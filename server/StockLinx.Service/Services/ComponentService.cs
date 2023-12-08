using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ComponentService(IRepository<Component> repository, IComponentRepository componentRepository,
            IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _componentRepository = componentRepository;
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
            var addedComponent = await AddAsync(newComponent);
            return await _componentRepository.GetDto(addedComponent);
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
            }
            var addedComponents = await AddRangeAsync(newComponents);
            return await _componentRepository.GetDtos(addedComponents.ToList());
        }

        public async Task<ComponentDto> UpdateComponentAsync(ComponentUpdateDto updateDto)
        {
            var componentInDb = await GetByIdAsync(updateDto.Id);
            if (componentInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the component to update is null.");
            }
            var updatedComponent = _mapper.Map<Component>(updateDto);
            updatedComponent.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(componentInDb, updatedComponent);
            var component = await GetByIdAsync(updateDto.Id);
            return await _componentRepository.GetDto(component);
        }

        public async Task DeleteComponentAsync(Guid componentId)
        {
            if (componentId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(componentId), $"The ID of the component to delete is null.");
            }
            var component = await GetByIdAsync(componentId);
            if (component == null)
            {
                throw new ArgumentNullException(nameof(component), $"The component to delete is null.");
            }
            await RemoveAsync(component);
        }

        public async Task DeleteRangeComponentAsync(List<Guid> componentIds)
        {
            var components = new List<Component>();
            foreach (var componentId in componentIds)
            {
                var component = GetByIdAsync(componentId).Result;
                components.Add(component);
            }
            await RemoveRangeAsync(components);
        }
    }
}
