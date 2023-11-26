using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ModelFieldDataRepository : Repository<ModelFieldData>, IModelFieldDataRepository
    {
        private readonly IMapper _mapper;
        public ModelFieldDataRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public ModelFieldDataDto GetDto(ModelFieldData entity)
        {
            return _mapper.Map<ModelFieldDataDto>(entity);
        }
        public List<ModelFieldDataDto> GetDtos(List<ModelFieldData> entities)
        {
            var dtos = new List<ModelFieldDataDto>();
            dtos = _mapper.Map<List<ModelFieldDataDto>>(entities);
            return dtos;
        }
        public async Task<List<ModelFieldDataDto>> GetAllDtos()
        {
            var entities = await dbContext.ModelFieldDatas.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
