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
    public class CustomFieldService : Service<CustomField>, ICustomFieldService
    {
        private readonly ICustomFieldRepository _customFieldRepository;
        private readonly IFieldSetCustomFieldRepository _fieldSetCustomFieldRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CustomFieldService(IRepository<CustomField> repository, ICustomFieldRepository customFieldRepository, IMapper mapper,
               IUnitOfWork unitOfWork, IFieldSetCustomFieldRepository fieldSetCustomFieldRepository) : base(repository, unitOfWork)
        {
            _customFieldRepository = customFieldRepository;
            _fieldSetCustomFieldRepository = fieldSetCustomFieldRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CustomFieldDto> GetDto(Guid id)
        {
            var customField = await GetByIdAsync(id);
            return _customFieldRepository.GetDto(customField);
        }

        public async Task<List<CustomFieldDto>> GetAllDtos()
        {
            return await _customFieldRepository.GetAllDtos();
        }

        public async Task CreateCustomFieldAsync(CustomFieldCreateDto createDto)
        {
            var newCustomField = _mapper.Map<CustomField>(createDto);
            var fcToAdd = new List<FieldSetCustomField>();
            newCustomField.Id = Guid.NewGuid();
            newCustomField.CreatedDate = DateTime.UtcNow;

            if (createDto.FieldSetCustomFields != null && createDto.FieldSetCustomFields.Any())
            {
                foreach (var fieldSetCustomFieldDto in createDto.FieldSetCustomFields)
                {
                    var newFieldSetCustomField = _mapper.Map<FieldSetCustomField>(fieldSetCustomFieldDto);
                    newFieldSetCustomField.Id = Guid.NewGuid();
                    newFieldSetCustomField.CreatedDate = DateTime.UtcNow;
                    newFieldSetCustomField.CustomFieldId = newCustomField.Id;
                    fcToAdd.Add(newFieldSetCustomField);
                }
                await _fieldSetCustomFieldRepository.AddRangeAsync(fcToAdd);
            }
            newCustomField.FieldSetCustomFields = null;
            await _customFieldRepository.AddAsync(newCustomField);
            await _unitOfWork.CommitAsync();
        }

        public async Task CreateRangeCustomFieldAsync(List<CustomFieldCreateDto> createDtos)
        {
            var newCustomFields = new List<CustomField>();
            foreach (var createDto in createDtos)
            {
                var newCustomField = _mapper.Map<CustomField>(createDto);
                newCustomField.Id = Guid.NewGuid();
                newCustomField.CreatedDate = DateTime.UtcNow;
                newCustomFields.Add(newCustomField);
            }
            await _customFieldRepository.AddRangeAsync(newCustomFields);
            await _unitOfWork.CommitAsync();
        }

        public async Task<CustomFieldDto> UpdateCustomFieldAsync(CustomFieldUpdateDto updateDto)
        {
            var customFieldInDb = await GetByIdAsync(updateDto.Id);
            if (customFieldInDb == null)
            {
                throw new ArgumentNullException("CustomField is not found");
            }
            var updatedCustomField = _mapper.Map<CustomField>(updateDto);
            updatedCustomField.UpdatedDate = DateTime.UtcNow;
            _customFieldRepository.Update(customFieldInDb, updatedCustomField);
            await _unitOfWork.CommitAsync();
            return _customFieldRepository.GetDto(updatedCustomField);
        }

        public async Task DeleteCustomFieldAsync(Guid customFieldId)
        {
            var customField = await GetByIdAsync(customFieldId);
            if (customField == null)
            {
                throw new ArgumentNullException("CustomField is not found");
            }
            _customFieldRepository.Update(customField, customField);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCustomFieldAsync(List<Guid> customFieldIds)
        {
            var customFields = new List<CustomField>();
            foreach (var customFieldId in customFieldIds)
            {
                var customField = await GetByIdAsync(customFieldId);
                if (customField == null)
                {
                    throw new ArgumentNullException($"{customFieldId} - CustomField is not found");
                }
                customFields.Add(customField);
            }
            _customFieldRepository.UpdateRange(customFields);
            await _unitOfWork.CommitAsync();
        }
    }
}
