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

        public async Task<ModelDto> GetDtoAsync(Guid id)
        {
            Model model = await GetByIdAsync(id);
            return _modelRepository.GetDto(model);
        }

        public async Task<List<ModelDto>> GetAllDtosAsync()
        {
            return await _modelRepository.GetAllDtosAsync();
        }

        public async Task<ModelDto> CreateModelAsync(ModelCreateDto dto)
        {
            ModelDto added = _modelRepository.CreateModel(dto);
            await _unitOfWork.CommitAsync();
            await _customLogService.CreateCustomLog("Create", "Model", added.Name);
            return added;
        }

        public async Task<List<ModelDto>> CreateRangeModelAsync(List<ModelCreateDto> dtos)
        {
            List<Model> models = new List<Model>();
            foreach (ModelCreateDto dto in dtos)
            {
                Model model = _mapper.Map<Model>(dto);
                model.Id = Guid.NewGuid();
                model.CreatedDate = DateTime.UtcNow;
                models.Add(model);
                await _customLogService.CreateCustomLog("Create", "Model", model.Name);
            }
            await _modelRepository.AddRangeAsync(models);
            await _unitOfWork.CommitAsync();
            return _modelRepository.GetDtos(models);
        }

        public async Task UpdateModelAsync(ModelUpdateDto dto)
        {
            var modelInDb = await GetByIdAsync(dto.Id);
            if (modelInDb == null)
            {
                throw new ArgumentNullException("Model is not found");
            }
            _modelRepository.UpdateModel(dto);
            await _customLogService.CreateCustomLog("Update", "Model", dto.Name);
        }

        public async Task DeleteModelAsync(Guid id)
        {
            var model = await GetByIdAsync(id);
            if (model == null)
            {
                throw new ArgumentNullException("Model is not found");
            }
            _modelRepository.Remove(model);
            await _customLogService.CreateCustomLog("Delete", "Model", model.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeModelAsync(List<Guid> ids)
        {
            var models = new List<Model>();
            foreach (var id in ids)
            {
                var model = await GetByIdAsync(id);
                if (model == null)
                {
                    throw new ArgumentNullException("Model is not found");
                }
                models.Add(model);
                await _customLogService.CreateCustomLog("Delete","Model", model.Name);
            }
            _modelRepository.RemoveRange(models);
            await _unitOfWork.CommitAsync();
        }
    }
}
