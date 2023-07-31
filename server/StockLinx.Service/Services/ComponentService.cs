using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using StockLinx.Repository.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ComponentService : Service<Component>, IComponentService
    {
        private readonly IComponentRepository _componentRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ComponentService(IRepository<Component> repository,IComponentRepository componentRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _componentRepository = componentRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task CreateComponentAsync(ComponentCreateDto createDto)
        {
            var newComponent = _mapper.Map<Component>(createDto);
            newComponent.Id = Guid.NewGuid();
            newComponent.CreatedDate = DateTime.UtcNow;

            //Check if newComponent.ImagePath is base64 or not and not null
            if (newComponent.ImagePath != null && newComponent.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newComponent.ImagePath.Substring(newComponent.ImagePath.IndexOf(',') + 1);
                string path = newComponent.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newComponent);
        }
        public async Task UpdateComponentAsync(ComponentUpdateDto updateDto)
        {
            var ComponentInDb = await GetByIdAsync(updateDto.Id);
            if (ComponentInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Component to update is null.");
            }
            var updatedComponent = _mapper.Map<Component>(updateDto);
            updatedComponent.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(ComponentInDb, updatedComponent);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteComponentAsync(Guid ComponentId)
        {
            if (ComponentId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(ComponentId), "The ID of the Component to delete is null.");
            }
            var Component = await GetByIdAsync(ComponentId);
            if (Component == null)
            {
                throw new ArgumentNullException(nameof(Component), "The Component to delete is null.");
            }
            await RemoveAsync(Component);
        }
    }
}
