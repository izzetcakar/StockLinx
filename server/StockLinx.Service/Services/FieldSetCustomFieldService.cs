using AutoMapper;
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

        public Task CreateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            throw new NotImplementedException();
        }

        public Task CreateRangeFieldSetCustomFieldAsync(List<FieldSetCustomFieldDto> dtos)
        {
            throw new NotImplementedException();
        }

        public Task DeleteFieldSetCustomFieldAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteRangeFieldSetCustomFieldAsync(List<Guid> ids)
        {
            throw new NotImplementedException();
        }

        public Task<List<FieldSetCustomFieldDto>> GetFieldSetCustomFieldDtos()
        {
            throw new NotImplementedException();
        }

        public Task UpdateFieldSetCustomFieldAsync(FieldSetCustomFieldDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
