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
            _mapper = mapper;
            _unitOfWork = unitOfWork;
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
            await _repository.AddAsync(newFieldSetCustomField);
            await _unitOfWork.CommitAsync();
            return _repository.GetDto(newFieldSetCustomField);
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
            await _repository.AddRangeAsync(newEntities);
            await _unitOfWork.CommitAsync();
            return _repository.GetDtos(newEntities);
        }

        public async Task DeleteFieldSetCustomFieldAsync(Guid id)
        {
            var fieldSetCustomField = await GetByIdAsync(id);
            _repository.Update(fieldSetCustomField, fieldSetCustomField);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeFieldSetCustomFieldAsync(List<Guid> ids)
        {
            var fieldSetCustomFields = new List<FieldSetCustomField>();
            foreach (var id in ids)
            {
                var entity = await GetByIdAsync(id);
                if (entity == null)
                {
                    throw new ArgumentNullException($"{id} - FieldSetCustomField is not found");
                }
                fieldSetCustomFields.Add(entity);
            }
            _repository.UpdateRange(fieldSetCustomFields);
            await _unitOfWork.CommitAsync();
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
            await _repository.AddRangeAsync(itemsToAdd);
            _repository.UpdateRange(itemsToDelete);
            await _unitOfWork.CommitAsync();
        }

    }
}
