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

        public async Task<ModelFieldDataDto> GetDto(Guid id)
        {
            var modelFieldData = await GetByIdAsync(id);
            return _modelFieldDataRepository.GetDto(modelFieldData);
        }

        public async Task<List<ModelFieldDataDto>> GetAllDtos()
        {
            return await _modelFieldDataRepository.GetAllDtos();
        }

        public async Task<ModelFieldDataDto> CreateModelFieldDataAsync(ModelFieldDataDto dto)
        {
            var newModelFieldData = _mapper.Map<ModelFieldData>(dto);
            newModelFieldData.Id = Guid.NewGuid();
            newModelFieldData.CreatedDate = DateTime.UtcNow;
            await _modelFieldDataRepository.AddAsync(newModelFieldData);
            await _unitOfWork.CommitAsync();
            return _modelFieldDataRepository.GetDto(newModelFieldData);
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
            await _modelFieldDataRepository.AddRangeAsync(newModelFieldDatas);
            await _unitOfWork.CommitAsync();
            return _modelFieldDataRepository.GetDtos(newModelFieldDatas);
        }

        public async Task<ModelFieldDataDto> UpdateModelFieldDataAsync(ModelFieldDataDto dto)
        {
            var modelFieldDataInDb = await GetByIdAsync(dto.Id);
            if (modelFieldDataInDb == null)
            {
                throw new ArgumentNullException("ModelFieldData is not found");
            }
            var updatedModelFieldData = _mapper.Map<ModelFieldData>(dto);
            updatedModelFieldData.UpdatedDate = DateTime.UtcNow;
            _modelFieldDataRepository.Update(modelFieldDataInDb, updatedModelFieldData);
            await _unitOfWork.CommitAsync();
            return _modelFieldDataRepository.GetDto(updatedModelFieldData);
        }

        public async Task DeleteModelFieldDataAsync(Guid id)
        {
            var modelFieldData = await GetByIdAsync(id);
            if (modelFieldData == null)
            {
                throw new ArgumentNullException("ModelFieldData is not found");
            }
            modelFieldData.DeletedDate = DateTime.UtcNow;
            _modelFieldDataRepository.Update(modelFieldData, modelFieldData);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeModelFieldDataAsync(List<Guid> ids)
        {
            var modelFieldDatas = new List<ModelFieldData>();
            foreach (var id in ids)
            {
                var modelFieldData = await _modelFieldDataRepository.GetByIdAsync(id);
                modelFieldData.DeletedDate = DateTime.UtcNow;
                modelFieldDatas.Add(modelFieldData);
            }
            _modelFieldDataRepository.UpdateRange(modelFieldDatas);
            await _unitOfWork.CommitAsync();
        }
    }
}
