using AutoMapper;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class ModelFieldDataService : Service<ModelFieldData>, IModelFieldDataService
    {
        private readonly IModelFieldDataRepository _modelFieldDataRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ModelFieldDataService(IRepository<ModelFieldData> repository, IModelFieldDataRepository modelFieldDataRepository,
            IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _modelFieldDataRepository = modelFieldDataRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<ModelFieldDataDto>> GetAllModelFieldDataDtos()
        {
            return await _modelFieldDataRepository.GetAllModelFieldDataDtos();
        }
        public async Task<ModelFieldDataDto> CreateModelFieldDataAsync(ModelFieldDataDto dto)
        {
            var newModelFieldData = _mapper.Map<ModelFieldData>(dto);
            newModelFieldData.Id = Guid.NewGuid();
            newModelFieldData.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newModelFieldData);
            return _modelFieldDataRepository.GetModelFieldDataDto(added);
        }

        public async Task<List<ModelFieldDataDto>> CreateRangeModelFieldDataAsync(List<ModelFieldDataDto> dtos)
        {
            var newModelFieldDatas = new List<ModelFieldData>();
            foreach (var dto in dtos)
            {
                var newModelFieldData = _mapper.Map<ModelFieldData>(dto);
                newModelFieldData.Id = Guid.NewGuid();
                newModelFieldData.CreatedDate = DateTime.UtcNow;
                newModelFieldDatas.Add(newModelFieldData);
            }
            var added = await AddRangeAsync(newModelFieldDatas);
            return _modelFieldDataRepository.GetModelFieldDataDtos(added.ToList());
        }

        public async Task UpdateModelFieldDataAsync(ModelFieldDataDto dto)
        {
            var modelFieldDataInDb = await GetByIdAsync(dto.Id);
            if (modelFieldDataInDb == null)
            {
                throw new ArgumentNullException(nameof(dto.Id), $"The ID of the modelFieldData to update is null.");
            }
            var updatedModelFieldData = _mapper.Map<ModelFieldData>(dto);
            updatedModelFieldData.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(modelFieldDataInDb, updatedModelFieldData);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteModelFieldDataAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(id), $"The ID of the modelFieldData to delete is null.");
            }
            var modelFieldData = await GetByIdAsync(id);
            if (modelFieldData == null)
            {
                throw new ArgumentNullException(nameof(modelFieldData), $"The modelFieldData to delete is null.");
            }
            await RemoveAsync(modelFieldData);
        }

        public async Task DeleteRangeModelFieldDataAsync(List<Guid> ids)
        {
            var modelFieldDatas = new List<ModelFieldData>();
            foreach (var id in ids)
            {
                var modelFieldData = GetByIdAsync(id).Result;
                modelFieldDatas.Add(modelFieldData);
            }
            await RemoveRangeAsync(modelFieldDatas);
        }
    }
}
