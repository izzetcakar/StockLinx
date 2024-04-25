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

        public async Task<FieldSetDto> GetDtoAsync(Guid id)
        {
            FieldSet fieldSet = await GetByIdAsync(id);
            return _fieldSetRepository.GetDto(fieldSet);
        }

        public async Task<List<FieldSetDto>> GetAllDtosAsync()
        {
            return await _fieldSetRepository.GetAllDtosAsync();
        }
        public async Task<FieldSetDto> CreateFieldSetAsync(FieldSetCreateDto createDto)
        {
            FieldSet fieldSet = _mapper.Map<FieldSet>(createDto);
            fieldSet.Id = Guid.NewGuid();
            fieldSet.CreatedDate = DateTime.UtcNow;
            await _fieldSetRepository.AddAsync(fieldSet);
            await _unitOfWork.CommitAsync();
            return _fieldSetRepository.GetDto(fieldSet);
        }

        public async Task<List<FieldSetDto>> CreateRangeFieldSetAsync(List<FieldSetCreateDto> dtos)
        {
            List<FieldSet> newEntities = new List<FieldSet>();
            foreach (var dto in dtos)
            {
                FieldSet fieldSet = _mapper.Map<FieldSet>(dto);
                fieldSet.Id = Guid.NewGuid();
                fieldSet.CreatedDate = DateTime.UtcNow;
                newEntities.Add(fieldSet);
            }
            await _fieldSetRepository.AddRangeAsync(newEntities);
            await _unitOfWork.CommitAsync();
            return _fieldSetRepository.GetDtos(newEntities);
        }

        public async Task<FieldSetDto> UpdateFieldSetAsync(FieldSetUpdateDto dto)
        {
            var fieldSetInDb = await GetByIdAsync(dto.Id);
            if (fieldSetInDb == null)
            {
                throw new ArgumentNullException("FieldSet is not found");
            }
            FieldSet updatedFieldSet = _mapper.Map<FieldSet>(dto);
            updatedFieldSet.UpdatedDate = DateTime.UtcNow;
            _fieldSetRepository.Update(fieldSetInDb, updatedFieldSet);
            await _unitOfWork.CommitAsync();
            return _fieldSetRepository.GetDto(updatedFieldSet);
        }

        public async Task DeleteFieldSetAsync(Guid id)
        {
            var fieldSet = await GetByIdAsync(id);
            if (fieldSet == null)
            {
                throw new ArgumentNullException("FieldSet is not found");
            }
            _fieldSetRepository.Remove(fieldSet);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeFieldSetAsync(List<Guid> ids)
        {
            var fieldSets = new List<FieldSet>();
            foreach (var id in ids)
            {
                var fieldSet = await GetByIdAsync(id);
                if (fieldSet == null)
                {
                    throw new ArgumentNullException("FieldSet is not found");
                }
                fieldSets.Add(fieldSet);
            }
            _fieldSetRepository.RemoveRange(fieldSets);
            await _unitOfWork.CommitAsync();
        }
    }
}
