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

        public ModelService(
            IRepository<Model> repository,
            IModelRepository modelRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ICustomLogService customLogService
        )
            : base(repository, unitOfWork)
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
            await _customLogService.CreateCustomLog("Create", "Model", Guid.Empty, added.Name);
            return added;
        }

        public async Task<List<ModelDto>> CreateRangeModelAsync(List<ModelCreateDto> dtos)
        {
            List<Model> models = new List<Model>();
            foreach (ModelCreateDto dto in dtos)
            {
                Model model = _mapper.Map<Model>(dto);
                models.Add(model);
                await _customLogService.CreateCustomLog("Create", "Model", model.Id, model.Name);
            }
            await _modelRepository.AddRangeAsync(models);
            await _unitOfWork.CommitAsync();
            return _modelRepository.GetDtos(models);
        }

        public async Task UpdateModelAsync(ModelUpdateDto dto)
        {
            Model modelInDb = await GetByIdAsync(dto.Id);
            _modelRepository.UpdateModel(dto);
            await _customLogService.CreateCustomLog("Update", "Model", dto.Id, dto.Name);
        }

        public async Task DeleteModelAsync(Guid id)
        {
            Model model = await GetByIdAsync(id);
            _modelRepository.Remove(model);
            await _customLogService.CreateCustomLog("Delete", "Model", model.Id, model.Name);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeModelAsync(List<Guid> ids)
        {
            List<Model> models = new List<Model>();
            foreach (Guid id in ids)
            {
                Model model = await GetByIdAsync(id);
                models.Add(model);
                await _customLogService.CreateCustomLog("Delete", "Model", model.Id, model.Name);
            }
            _modelRepository.RemoveRange(models);
            await _unitOfWork.CommitAsync();
        }
    }
}
