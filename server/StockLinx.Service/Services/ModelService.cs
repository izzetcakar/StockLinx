using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ModelService(IRepository<Model> repository, IModelRepository modelRepository, IUnitOfWork unitOfWork, IMapper mapper) : base(repository, unitOfWork)
        {
            _modelRepository = modelRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ModelDto>> GetModelDtos()
        {
            var models = await _modelRepository.GetAll().ToListAsync();
            var modelDtos = _mapper.Map<List<ModelDto>>(models);
            return modelDtos;
        }
        public async Task CreateModelAsync(ModelCreateDto createDto)
        {
            var newModel = _mapper.Map<Model>(createDto);
            newModel.Id = Guid.NewGuid();
            newModel.CreatedDate = DateTime.UtcNow;
            await AddAsync(newModel);
        }

        public async Task CreateRangeModelAsync(List<ModelCreateDto> createDtos)
        {
            var newModels = new List<Model>();
            foreach (var createDto in createDtos)
            {
                var newModel = _mapper.Map<Model>(createDto);
                newModel.Id = Guid.NewGuid();
                newModel.CreatedDate = DateTime.UtcNow;
                newModels.Add(newModel);
            }
            await AddRangeAsync(newModels);
        }

        public async Task UpdateModelAsync(ModelUpdateDto updateDto)
        {
            var modelInDb = await GetByIdAsync(updateDto.Id);
            if (modelInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the model to update is null.");
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
                throw new ArgumentNullException(nameof(modelId), $"The ID of the model to delete is null.");
            }
            var model = await GetByIdAsync(modelId);
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model), $"The model to delete is null.");
            }
            await RemoveAsync(model);
        }

        public async Task DeleteRangeModelAsync(List<Guid> modelIds)
        {
            var models = new List<Model>();
            foreach (var modelId in modelIds)
            {
                var model = GetByIdAsync(modelId).Result;
                models.Add(model);
            }
            await RemoveRangeAsync(models);
        }
    }
}
