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

        public CustomFieldService(
            IRepository<CustomField> repository,
            ICustomFieldRepository customFieldRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            IFieldSetCustomFieldRepository fieldSetCustomFieldRepository
        )
            : base(repository, unitOfWork)
        {
            _customFieldRepository = customFieldRepository;
            _fieldSetCustomFieldRepository = fieldSetCustomFieldRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CustomFieldDto> GetDtoAsync(Guid id)
        {
            CustomField customField = await GetByIdAsync(id);
            return _customFieldRepository.GetDto(customField);
        }

        public async Task<List<CustomFieldDto>> GetAllDtosAsync()
        {
            return await _customFieldRepository.GetAllDtosAsync();
        }

        public async Task CreateCustomFieldAsync(CustomFieldCreateDto dto)
        {
            CustomField customField = _mapper.Map<CustomField>(dto);
            List<FieldSetCustomField> fcToAdd = new List<FieldSetCustomField>();

            if (dto.FieldSetCustomFields != null && dto.FieldSetCustomFields.Any())
            {
                foreach (FieldSetCustomFieldDto fieldSetCustomFieldDto in dto.FieldSetCustomFields)
                {
                    FieldSetCustomField fieldSetCustomField = _mapper.Map<FieldSetCustomField>(
                        fieldSetCustomFieldDto
                    );
                    fcToAdd.Add(fieldSetCustomField);
                }
                await _fieldSetCustomFieldRepository.AddRangeAsync(fcToAdd);
            }
            customField.FieldSetCustomFields = null;
            await _customFieldRepository.AddAsync(customField);
            await _unitOfWork.CommitAsync();
        }

        public async Task CreateRangeCustomFieldAsync(List<CustomFieldCreateDto> dtos)
        {
            List<CustomField> customFields = new List<CustomField>();
            foreach (CustomFieldCreateDto dto in dtos)
            {
                CustomField customField = _mapper.Map<CustomField>(dto);
                customFields.Add(customField);
            }
            await _customFieldRepository.AddRangeAsync(customFields);
            await _unitOfWork.CommitAsync();
        }

        public async Task<CustomFieldDto> UpdateCustomFieldAsync(CustomFieldUpdateDto dto)
        {
            CustomField customFieldInDb = await GetByIdAsync(dto.Id);
            CustomField customField = _mapper.Map<CustomField>(dto);
            customField.UpdatedDate = DateTime.UtcNow;
            _customFieldRepository.Update(customFieldInDb, customField);
            await _unitOfWork.CommitAsync();
            return _customFieldRepository.GetDto(customField);
        }

        public async Task DeleteCustomFieldAsync(Guid id)
        {
            CustomField customField = await GetByIdAsync(id);
            _customFieldRepository.Remove(customField);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeCustomFieldAsync(List<Guid> ids)
        {
            List<CustomField> customFields = new List<CustomField>();
            foreach (Guid id in ids)
            {
                CustomField customField = await GetByIdAsync(id);
                customFields.Add(customField);
            }
            _customFieldRepository.RemoveRange(customFields);
            await _unitOfWork.CommitAsync();
        }
    }
}
