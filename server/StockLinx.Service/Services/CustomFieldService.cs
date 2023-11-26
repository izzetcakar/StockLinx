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
        private readonly IRepository<CustomField> _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CustomFieldService(IRepository<CustomField> repository, ICustomFieldRepository customFieldRepository,
              IMapper mapper, IUnitOfWork unitOfWork) : base(repository, unitOfWork)
        {
            _repository = repository;
            _customFieldRepository = customFieldRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<CustomFieldDto>> GetAllCustomFieldDtos()
        {
            return await _customFieldRepository.GetAllCustomFieldDtos();
        }
        public async Task CreateCustomFieldAsync(CustomFieldCreateDto createDto)
        {
            try
            {
                await _customFieldRepository.CreateCustomField(createDto);
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
            await AddRangeAsync(newCustomFields);
        }

        public async Task UpdateCustomFieldAsync(CustomFieldUpdateDto updateDto)
        {
            var customFieldInDb = await GetByIdAsync(updateDto.Id);
            if (customFieldInDb == null)
            {
                throw new ArgumentNullException(nameof(updateDto.Id), $"The ID of the customField to update is null.");
            }
            var updatedCustomField = _mapper.Map<CustomField>(updateDto);
            updatedCustomField.UpdatedDate = DateTime.UtcNow;
            await UpdateAsync(customFieldInDb, updatedCustomField);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteCustomFieldAsync(Guid customFieldId)
        {
            if (customFieldId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(customFieldId), $"The ID of the customField to delete is null.");
            }
            var customField = await GetByIdAsync(customFieldId);
            if (customField == null)
            {
                throw new ArgumentNullException(nameof(customField), $"The customField to delete is null.");
            }
            await RemoveAsync(customField);
        }

        public async Task DeleteRangeCustomFieldAsync(List<Guid> customFieldIds)
        {
            var customFields = new List<CustomField>();
            foreach (var customFieldId in customFieldIds)
            {
                var customField = GetByIdAsync(customFieldId).Result;
                customFields.Add(customField);
            }
            await RemoveRangeAsync(customFields);
        }
    }
}
