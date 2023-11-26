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
    public class FieldSetService : Service<FieldSet>, IFieldSetService
    {
        private readonly IFieldSetRepository _fieldSetRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FieldSetService(IRepository<FieldSet> repository, IFieldSetRepository fieldSetRepository,
            IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _fieldSetRepository = fieldSetRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<FieldSetDto>> GetAllDtos()
        {
            return await _fieldSetRepository.GetAllDtos();
        }
        public async Task<FieldSetDto> CreateFieldSetAsync(FieldSetCreateDto createDto)
        {
            var newFieldSet = _mapper.Map<FieldSet>(createDto);
            newFieldSet.Id = Guid.NewGuid();
            newFieldSet.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newFieldSet);
            return _fieldSetRepository.GetDto(added);
        }

        public async Task<List<FieldSetDto>> CreateRangeFieldSetAsync(List<FieldSetCreateDto> createDtos)
        {
            var newEntities = new List<FieldSet>();
            foreach (var createDto in createDtos)
            {
                var newFieldSet = _mapper.Map<FieldSet>(createDto);
                newFieldSet.Id = Guid.NewGuid();
                newFieldSet.CreatedDate = DateTime.UtcNow;
                newEntities.Add(newFieldSet);
            }
            var added = await AddRangeAsync(newEntities);
            return _fieldSetRepository.GetDtos(added.ToList());
        }

        public async Task UpdateFieldSetAsync(FieldSetUpdateDto updateDto)
        {
            var fieldSetInDb = await GetByIdAsync(updateDto.Id);
            if (fieldSetInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), "The ID of the fieldSet to update is null.");
            }
            var updatedFieldSet = _mapper.Map<FieldSet>(updateDto);
            updatedFieldSet.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(fieldSetInDb, updatedFieldSet);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteFieldSetAsync(Guid fieldSetId)
        {
            if (fieldSetId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(fieldSetId), "The ID of the fieldSet to delete is null.");
            }
            var fieldSet = await GetByIdAsync(fieldSetId);
            if (fieldSet == null)
            {
                throw new ArgumentNullException(nameof(fieldSet), "The fieldSet to delete is null.");
            }
            await RemoveAsync(fieldSet);
        }

        public async Task DeleteRangeFieldSetAsync(List<Guid> fieldSetIds)
        {
            var fieldSets = new List<FieldSet>();
            foreach (var fieldSetId in fieldSetIds)
            {
                var fieldSet = GetByIdAsync(fieldSetId).Result;
                fieldSets.Add(fieldSet);
            }
            await RemoveRangeAsync(fieldSets);
        }
    }
}
