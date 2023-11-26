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

        public async Task<List<FieldSetCustomFieldDto>> GetFieldSetCustomFieldDtos()
        {
            var fieldSetCustomFields = await _repository.GetAll().ToListAsync();
            var fieldSetCustomFieldDtos = fieldSetCustomFields
             .Select(x => new FieldSetCustomFieldDto
             {
                 Id = x.Id,
                 CustomFieldId = x.CustomFieldId,
                 FieldSetId = x.FieldSetId,
                 CreatedDate = x.CreatedDate,
                 UpdatedDate = x.UpdatedDate,
                 DeletedDate = x.DeletedDate,
             }).ToList();
            return fieldSetCustomFieldDtos;
        }
        public async Task CreateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            var newFieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
            newFieldSetCustomField.Id = Guid.NewGuid();
            newFieldSetCustomField.CreatedDate = DateTime.UtcNow;
            await AddAsync(newFieldSetCustomField);
        }

        public async Task CreateRangeFieldSetCustomFieldAsync(List<FieldSetCustomFieldDto> dtos)
        {
            var newEntities = new List<FieldSetCustomField>();
            foreach (var dto in dtos)
            {
                var newFieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
                newFieldSetCustomField.Id = Guid.NewGuid();
                newFieldSetCustomField.CreatedDate = DateTime.UtcNow;
                newEntities.Add(newFieldSetCustomField);
            }
            await AddRangeAsync(newEntities);
        }

        public async Task UpdateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            var fieldSetCustomFieldInDb = await GetByIdAsync(dto.Id);
            if (fieldSetCustomFieldInDb == null)
            {
                throw new ArgumentNullException(nameof(dto.Id), "The ID of the fieldSetCustomField to update is null.");
            }
            var updatedFieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
            updatedFieldSetCustomField.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(fieldSetCustomFieldInDb, updatedFieldSetCustomField);
            await _unitOfWork.CommitAsync();
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
            var itemsInDb = await _repository.GetAll().ToListAsync();

            foreach (var itemInDb in itemsInDb)
            {
                var itemInDbDto = _mapper.Map<FieldSetCustomFieldDto>(itemInDb);
                var itemInDbDtoInList = dtos.FirstOrDefault(x => x.Id == itemInDbDto.Id);

                if (itemInDbDtoInList == null)
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
            await RemoveRangeAsync(itemsToDelete);
            await AddRangeAsync(itemsToAdd);
        }

    }
}
