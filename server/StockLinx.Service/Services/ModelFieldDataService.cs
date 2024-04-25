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

        public async Task<ModelFieldDataDto> GetDtoAsync(Guid id)
        {
            ModelFieldData modelFieldData = await GetByIdAsync(id);
            if (modelFieldData == null)
            {
                throw new Exception("ModelFieldData is not found");
            }
            return _modelFieldDataRepository.GetDto(modelFieldData);
        }

        public async Task<List<ModelFieldDataDto>> GetAllDtosAsync()
        {
            return await _modelFieldDataRepository.GetAllDtosAsync();
        }

        public async Task<ModelFieldDataDto> CreateModelFieldDataAsync(ModelFieldDataDto dto)
        {
            ModelFieldData modelFieldData = _mapper.Map<ModelFieldData>(dto);
            modelFieldData.Id = Guid.NewGuid();
            modelFieldData.CreatedDate = DateTime.UtcNow;
            await _modelFieldDataRepository.AddAsync(modelFieldData);
            await _unitOfWork.CommitAsync();
            return _modelFieldDataRepository.GetDto(modelFieldData);
        }

        public async Task<List<ModelFieldDataDto>> CreateRangeModelFieldDataAsync(List<ModelFieldDataDto> dtos)
        {
            List<ModelFieldData> modelFieldDatas = new List<ModelFieldData>();
            foreach (ModelFieldDataDto dto in dtos)
            {
                ModelFieldData modelFieldData = _mapper.Map<ModelFieldData>(dto);
                modelFieldData.Id = Guid.NewGuid();
                modelFieldData.CreatedDate = DateTime.UtcNow;
                modelFieldDatas.Add(modelFieldData);
            }
            await _modelFieldDataRepository.AddRangeAsync(modelFieldDatas);
            await _unitOfWork.CommitAsync();
            return _modelFieldDataRepository.GetDtos(modelFieldDatas);
        }

        public async Task<ModelFieldDataDto> UpdateModelFieldDataAsync(ModelFieldDataDto dto)
        {
            ModelFieldData modelFieldDataInDb = await GetByIdAsync(dto.Id);
            if (modelFieldDataInDb == null)
            {
                throw new Exception("ModelFieldData is not found");
            }
            ModelFieldData modelFieldData = _mapper.Map<ModelFieldData>(dto);
            modelFieldData.UpdatedDate = DateTime.UtcNow;
            _modelFieldDataRepository.Update(modelFieldDataInDb, modelFieldData);
            await _unitOfWork.CommitAsync();
            return _modelFieldDataRepository.GetDto(modelFieldData);
        }

        public async Task DeleteModelFieldDataAsync(Guid id)
        {
            ModelFieldData modelFieldData = await GetByIdAsync(id);
            if (modelFieldData == null)
            {
                throw new Exception("ModelFieldData is not found");
            }
            _modelFieldDataRepository.Remove(modelFieldData);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeModelFieldDataAsync(List<Guid> ids)
        {
            List<ModelFieldData> modelFieldDatas = new List<ModelFieldData>();
            foreach (Guid id in ids)
            {
                ModelFieldData modelFieldData = await GetByIdAsync(id);
                if (modelFieldData == null)
                {
                    throw new Exception("ModelFieldData is not found");
                }
                modelFieldDatas.Add(modelFieldData);
            }
            _modelFieldDataRepository.RemoveRange(modelFieldDatas);
            await _unitOfWork.CommitAsync();
        }
    }
}
