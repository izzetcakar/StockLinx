using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CustomFieldRepository : Repository<CustomField>, ICustomFieldRepository
    {
        private readonly IMapper _mapper;
        public CustomFieldRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public CustomFieldDto GetDto(CustomField entity)
        {
            return _mapper.Map<CustomFieldDto>(entity);
        }
        public List<CustomFieldDto> GetDtos(List<CustomField> entities)
        {
            var dtos = new List<CustomFieldDto>();
            dtos = _mapper.Map<List<CustomFieldDto>>(entities);
            return dtos;
        }
        public async Task<List<CustomFieldDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.CustomFields.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
