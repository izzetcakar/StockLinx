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
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<FieldSetDto> GetDto(Guid id)
        {
            var fieldSet = await GetByIdAsync(id);
            return _fieldSetRepository.GetDto(fieldSet);
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
            await _fieldSetRepository.AddAsync(newFieldSet);
            await _unitOfWork.CommitAsync();
            return _fieldSetRepository.GetDto(newFieldSet);
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
            await _fieldSetRepository.AddRangeAsync(newEntities);
            await _unitOfWork.CommitAsync();
            return _fieldSetRepository.GetDtos(newEntities);
        }

        public async Task<FieldSetDto> UpdateFieldSetAsync(FieldSetUpdateDto updateDto)
        {
            var fieldSetInDb = await GetByIdAsync(updateDto.Id);
            if (fieldSetInDb == null)
            {
                throw new ArgumentNullException("FieldSet is not found");
            }
            var updatedFieldSet = _mapper.Map<FieldSet>(updateDto);
            updatedFieldSet.UpdatedDate = DateTime.UtcNow;
            _fieldSetRepository.Update(fieldSetInDb, updatedFieldSet);
            await _unitOfWork.CommitAsync();
            return _fieldSetRepository.GetDto(updatedFieldSet);
        }

        public async Task DeleteFieldSetAsync(Guid fieldSetId)
        {
            var fieldSet = await GetByIdAsync(fieldSetId);
            if (fieldSet == null)
            {
                throw new ArgumentNullException("FieldSet is not found");
            }
            fieldSet.DeletedDate = DateTime.UtcNow;
            _fieldSetRepository.Update(fieldSet, fieldSet);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeFieldSetAsync(List<Guid> fieldSetIds)
        {
            var fieldSets = new List<FieldSet>();
            foreach (var fieldSetId in fieldSetIds)
            {
                var fieldSet = await GetByIdAsync(fieldSetId);
                if (fieldSet == null)
                {
                    throw new ArgumentNullException($"{fieldSetId} - FieldSet is not found");
                }
                fieldSet.DeletedDate = DateTime.UtcNow;
                fieldSets.Add(fieldSet);
            }
            _fieldSetRepository.UpdateRange(fieldSets);
            await _unitOfWork.CommitAsync();
        }
    }
}
