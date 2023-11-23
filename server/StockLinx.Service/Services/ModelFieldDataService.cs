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

        public async Task<List<ModelFieldDataDto>> GetModelFieldDataDtos()
        {
            var modelFieldDatas = await _modelFieldDataRepository.GetAll()
            .Select(x => new ModelFieldDataDto
            {
                Id = x.Id,
                ModelId = x.ModelId,
                CustomFieldId = x.CustomFieldId,
                Value = x.Value,
                CreatedDate = x.CreatedDate,
                UpdatedDate = x.UpdatedDate,
                DeletedDate = x.DeletedDate,
            }).ToListAsync();
            return modelFieldDatas;
        }
        public async Task CreateModelFieldDataAsync(ModelFieldDataCreateDto createDto)
        {
            var modelFieldDatas = new List<ModelFieldData>();
            var newModelFieldData = _mapper.Map<ModelFieldData>(createDto);
            newModelFieldData.Id = Guid.NewGuid();
            newModelFieldData.CreatedDate = DateTime.UtcNow;
            modelFieldDatas.Add(newModelFieldData);
            await AddRangeAsync(modelFieldDatas);
        }

        public async Task CreateRangeModelFieldDataAsync(List<ModelFieldDataCreateDto> createDtos)
        {
            var newModelFieldDatas = new List<ModelFieldData>();
            foreach (var createDto in createDtos)
            {
                var newModelFieldData = _mapper.Map<ModelFieldData>(createDto);
                newModelFieldData.Id = Guid.NewGuid();
                newModelFieldData.CreatedDate = DateTime.UtcNow;
                newModelFieldDatas.Add(newModelFieldData);
            }
            await AddRangeAsync(newModelFieldDatas);
        }

        public async Task UpdateModelFieldDataAsync(ModelFieldDataUpdateDto updateDto)
        {
            var modelFieldDataInDb = await GetByIdAsync(updateDto.Id);
            if (modelFieldDataInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the modelFieldData to update is null.");
            }
            var updatedModelFieldData = _mapper.Map<ModelFieldData>(updateDto);
            updatedModelFieldData.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(modelFieldDataInDb, updatedModelFieldData);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteModelFieldDataAsync(Guid modelFieldDataId)
        {
            if (modelFieldDataId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(modelFieldDataId), $"The ID of the modelFieldData to delete is null.");
            }
            var modelFieldData = await GetByIdAsync(modelFieldDataId);
            if (modelFieldData == null)
            {
                throw new ArgumentNullException(nameof(modelFieldData), $"The modelFieldData to delete is null.");
            }
            await RemoveAsync(modelFieldData);
        }

        public async Task DeleteRangeModelFieldDataAsync(List<Guid> modelFieldDataIds)
        {
            var modelFieldDatas = new List<ModelFieldData>();
            foreach (var modelFieldDataId in modelFieldDataIds)
            {
                var modelFieldData = GetByIdAsync(modelFieldDataId).Result;
                modelFieldDatas.Add(modelFieldData);
            }
            await RemoveRangeAsync(modelFieldDatas);
        }
    }
}
