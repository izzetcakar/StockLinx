using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;

namespace StockLinx.Service.Services
{
    public class FieldSetCustomFieldService : Service<FieldSetCustomField>, IFieldSetCustomFieldService
    {
        private readonly IFieldSetCustomFieldRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FieldSetCustomFieldService(IRepository<FieldSetCustomField> repository, IFieldSetCustomFieldRepository fieldSetCustomFieldRepository,
            IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = fieldSetCustomFieldRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<FieldSetCustomFieldDto> GetDto(Guid id)
        {
            var fieldSetCustomField = await GetByIdAsync(id);
            return _repository.GetDto(fieldSetCustomField);
        }

        public async Task<List<FieldSetCustomFieldDto>> GetAllDtos()
        {
            return await _repository.GetAllDtos();
        }

        public async Task<FieldSetCustomFieldDto> CreateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            var newFieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
            newFieldSetCustomField.Id = Guid.NewGuid();
            newFieldSetCustomField.CreatedDate = DateTime.UtcNow;
            var added = await AddAsync(newFieldSetCustomField);
            return _repository.GetDto(added);
        }

        public async Task<List<FieldSetCustomFieldDto>> CreateRangeFieldSetCustomFieldAsync(List<FieldSetCustomFieldDto> dtos)
        {
            var newEntities = new List<FieldSetCustomField>();
            foreach (var dto in dtos)
            {
                var newFieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
                newFieldSetCustomField.Id = Guid.NewGuid();
                newFieldSetCustomField.CreatedDate = DateTime.UtcNow;
                newEntities.Add(newFieldSetCustomField);
            }
            var added = await AddRangeAsync(newEntities);
            return _repository.GetDtos(added.ToList());
        }

        public async Task<FieldSetCustomFieldDto> UpdateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            var fieldSetCustomFieldInDb = await GetByIdAsync(dto.Id);
            if (fieldSetCustomFieldInDb == null)
            {
                throw new ArgumentNullException(nameof(dto.Id), "The ID of the fieldSetCustomField to update is null.");
            }
            var updatedFieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
            updatedFieldSetCustomField.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(fieldSetCustomFieldInDb, updatedFieldSetCustomField);
            var fieldSetCustomField = await GetByIdAsync(dto.Id);
            return _repository.GetDto(fieldSetCustomField);
        }

        public async Task DeleteFieldSetCustomFieldAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(id), "The ID of the fieldSetCustomField to delete is null.");
            }
            var fieldSetCustomField = await GetByIdAsync(id);
            if (fieldSetCustomField == null)
            {
                throw new ArgumentNullException(nameof(fieldSetCustomField), "The fieldSetCustomField to delete is null.");
            }
            await RemoveAsync(fieldSetCustomField);
        }

        public async Task DeleteRangeFieldSetCustomFieldAsync(List<Guid> ids)
        {
            var fieldSetCustomFields = new List<FieldSetCustomField>();
            foreach (var id in ids)
            {
                var fieldSetCustomField = GetByIdAsync(id).Result;
                fieldSetCustomFields.Add(fieldSetCustomField);
            }
            await RemoveRangeAsync(fieldSetCustomFields);
        }

        public async Task SynchronizeFieldSetCustomFieldsAsync(List<FieldSetCustomFieldDto> dtos)
        {
            var itemsToDelete = new List<FieldSetCustomField>();
            var itemsToAdd = new List<FieldSetCustomField>();
            var itemsInDb = await _repository.Where(x => x.CustomFieldId == dtos[0].CustomFieldId).ToListAsync();

            foreach (var itemInDb in itemsInDb)
            {
                var isItemExist = dtos.Any(x => x.Id == itemInDb.Id);

                if (!isItemExist)
                {
                    itemsToDelete.Add(itemInDb);
                }
            }
            var idsInDb = itemsInDb.Select(item => item.Id);
            itemsToAdd.AddRange(dtos
                .Where(dto => !idsInDb.Contains(dto.Id))
                .Select(dto =>
                {
                    var newItem = _mapper.Map<FieldSetCustomField>(dto);
                    newItem.Id = Guid.NewGuid();
                    newItem.CreatedDate = DateTime.UtcNow;
                    return newItem;
                }));
            await AddRangeAsync(itemsToAdd);
            await RemoveRangeAsync(itemsToDelete);
        }

    }
}
