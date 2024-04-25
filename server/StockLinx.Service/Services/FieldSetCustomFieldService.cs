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

        public async Task<FieldSetCustomFieldDto> GetDtoAsync(Guid id)
        {
            FieldSetCustomField fieldSetCustomField = await GetByIdAsync(id);
            if (fieldSetCustomField == null)
            {
                throw new Exception("FieldSetCustomField is not found");
            }
            return _repository.GetDto(fieldSetCustomField);
        }

        public async Task<List<FieldSetCustomFieldDto>> GetAllDtosAsync()
        {
            return await _repository.GetAllDtosAsync();
        }

        public async Task<FieldSetCustomFieldDto> CreateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            FieldSetCustomField fieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
            fieldSetCustomField.Id = Guid.NewGuid();
            fieldSetCustomField.CreatedDate = DateTime.UtcNow;
            await _repository.AddAsync(fieldSetCustomField);
            await _unitOfWork.CommitAsync();
            return _repository.GetDto(fieldSetCustomField);
        }

        public async Task<List<FieldSetCustomFieldDto>> CreateRangeFieldSetCustomFieldAsync(List<FieldSetCustomFieldDto> dtos)
        {
            List<FieldSetCustomField> newEntities = new List<FieldSetCustomField>();
            foreach (FieldSetCustomFieldDto dto in dtos)
            {
                FieldSetCustomField fieldSetCustomField = _mapper.Map<FieldSetCustomField>(dto);
                fieldSetCustomField.Id = Guid.NewGuid();
                fieldSetCustomField.CreatedDate = DateTime.UtcNow;
                newEntities.Add(fieldSetCustomField);
            }
            await _repository.AddRangeAsync(newEntities);
            await _unitOfWork.CommitAsync();
            return _repository.GetDtos(newEntities);
        }

        public async Task DeleteFieldSetCustomFieldAsync(Guid id)
        {
            FieldSetCustomField fieldSetCustomField = await GetByIdAsync(id);
            _repository.Remove(fieldSetCustomField);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeFieldSetCustomFieldAsync(List<Guid> ids)
        {
            List<FieldSetCustomField> fieldSetCustomFields = new List<FieldSetCustomField>();
            foreach (Guid id in ids)
            {
                FieldSetCustomField entity = await GetByIdAsync(id);
                if (entity == null)
                {
                    throw new Exception("FieldSetCustomField is not found");
                }
                fieldSetCustomFields.Add(entity);
            }
            _repository.RemoveRange(fieldSetCustomFields);
            await _unitOfWork.CommitAsync();
        }

        public async Task SynchronizeFieldSetCustomFieldsAsync(List<FieldSetCustomFieldDto> dtos)
        {
            List<FieldSetCustomField> itemsToDelete = new List<FieldSetCustomField>();
            List<FieldSetCustomField> itemsToAdd = new List<FieldSetCustomField>();
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
