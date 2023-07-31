using AutoMapper;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ModelService : Service<Model>, IModelService
    {
        private readonly IModelRepository _modelRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ModelService(IRepository<Model> repository, IModelRepository modelRepository,IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _modelRepository = modelRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateModelAsync(ModelCreateDto createDto)
        {
            var newModel = _mapper.Map<Model>(createDto);
            newModel.Id = Guid.NewGuid();
            newModel.CreatedDate = DateTime.UtcNow;

            //Check if newModel.ImagePath is base64 or not and not null
            if (newModel.ImagePath != null && newModel.ImagePath.Contains("data:image/png;base64,"))
            {
                string base64 = newModel.ImagePath.Substring(newModel.ImagePath.IndexOf(',') + 1);
                string path = newModel.Name + DateTime.Now.ToString("yyyyMMddHHmmss");
                ImageHandler.UploadBase64AsFile(base64, path);
            }
            await AddAsync(newModel);
        }
        public async Task UpdateModelAsync(ModelUpdateDto updateDto)
        {
            var modelInDb = await GetByIdAsync(updateDto.Id);
            if (modelInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the Model to update is null.");
            }
            var updatedModel = _mapper.Map<Model>(updateDto);
            updatedModel.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(modelInDb, updatedModel);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteModelAsync(Guid modelId)
        {
            if (modelId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(modelId), "The ID of the Model to delete is null.");
            }
            var Model = await GetByIdAsync(modelId);
            if (Model == null)
            {
                throw new ArgumentNullException(nameof(Model), "The Model to delete is null.");
            }
            await RemoveAsync(Model);
        }
    }
}
