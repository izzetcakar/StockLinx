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
    public class ModelService : Service<Model>, IModelService
    {
        private readonly IModelRepository _modelRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ModelService(IRepository<Model> repository, IModelRepository modelRepository,
            IUnitOfWork unitOfWork, IMapper mapper, ICustomLogService customLogService) : base(repository, unitOfWork)
        {
            _modelRepository = modelRepository;
            _customLogService = customLogService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ModelDto> GetDto(Guid id)
        {
            var model = await GetByIdAsync(id);
            return _modelRepository.GetDto(model);
        }

        public async Task<List<ModelDto>> GetAllDtos()
        {
            return await _modelRepository.GetAllDtos();
        }

        public async Task<ModelDto> CreateModelAsync(ModelCreateDto createDto)
        {
            var added = _modelRepository.CreateModel(createDto);
            await _unitOfWork.CommitAsync();
            await _customLogService.CreateCustomLog("Create", added.Id, null, "Model", null);
            return added;
        }

        public async Task<List<ModelDto>> CreateRangeModelAsync(List<ModelCreateDto> createDtos)
        {
            var newModels = new List<Model>();
            foreach (var createDto in createDtos)
            {
                var newModel = _mapper.Map<Model>(createDto);
                newModel.Id = Guid.NewGuid();
                newModel.CreatedDate = DateTime.UtcNow;
                newModels.Add(newModel);
                await _customLogService.CreateCustomLog("Create", newModel.Id, null, "Model", null);
            }
            await _modelRepository.AddRangeAsync(newModels);
            await _unitOfWork.CommitAsync();
            return _modelRepository.GetDtos(newModels);
        }

        public async Task UpdateModelAsync(ModelUpdateDto updateDto)
        {
            var modelInDb = await GetByIdAsync(updateDto.Id);
            if (modelInDb == null)
            {
                throw new ArgumentNullException("Model is not found");
            }
            try
            {
                _modelRepository.UpdateModel(updateDto);
                await _customLogService.CreateCustomLog("Update", updateDto.Id, null, "Model", null);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task DeleteModelAsync(Guid modelId)
        {
            var model = await GetByIdAsync(modelId);
            if (model == null)
            {
                throw new ArgumentNullException("Model is not found");
            }
            _modelRepository.Update(model, model);
            await _customLogService.CreateCustomLog("Delete", model.Id, null, "Model", null);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeModelAsync(List<Guid> modelIds)
        {
            var models = new List<Model>();
            foreach (var modelId in modelIds)
            {
                var model = await GetByIdAsync(modelId);
                if (model == null)
                {
                    throw new ArgumentNullException($"{modelId} - Model is not found");
                }
                models.Add(model);
                await _customLogService.CreateCustomLog("Delete", model.Id, null, "Model", null);
            }
            _modelRepository.UpdateRange(models);
        }
    }
}
