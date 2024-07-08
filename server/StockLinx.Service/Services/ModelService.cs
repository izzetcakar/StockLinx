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
        private readonly IFilterService<Model> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ModelService(
            IRepository<Model> repository,
            IModelRepository modelRepository,
            ICustomLogService customLogService,
            IFilterService<Model> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _modelRepository = modelRepository;
            _customLogService = customLogService;
            _filterService = filterService;
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
            Model model = _mapper.Map<Model>(dto);
            await _unitOfWork.CommitAsync();
            await CreateCheckLogAsync("Create", model);
            return added;
        }

        public async Task<List<ModelDto>> CreateRangeModelAsync(List<ModelCreateDto> dtos)
        {
            List<Model> models = new List<Model>();
            foreach (ModelCreateDto dto in dtos)
            {
                Model model = _mapper.Map<Model>(dto);
                models.Add(model);
                await CreateCheckLogAsync("Create", model);
            }
            await _modelRepository.AddRangeAsync(models);
            await _unitOfWork.CommitAsync();
            return _modelRepository.GetDtos(models);
        }

        public async Task UpdateModelAsync(ModelUpdateDto dto)
        {
            Model modelInDb = await GetByIdAsync(dto.Id);
            _modelRepository.UpdateModel(dto);
            await CreateCheckLogAsync("Update", modelInDb);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteModelAsync(Guid id)
        {
            Model model = await GetByIdAsync(id);
            _modelRepository.Remove(model);
            await CreateCheckLogAsync("Delete", model);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeModelAsync(List<Guid> ids)
        {
            List<Model> models = new List<Model>();
            foreach (Guid id in ids)
            {
                Model model = await GetByIdAsync(id);
                models.Add(model);
                await CreateCheckLogAsync("Delete", model);
            }
            _modelRepository.RemoveRange(models);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<ModelDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return _modelRepository.GetDtos(result.ToList());
        }

        public async Task CreateCheckLogAsync(string action, Model model)
        {
            await _customLogService.CreateCustomLog(action, "Model", model.Id, model.Name);
        }
    }
}
