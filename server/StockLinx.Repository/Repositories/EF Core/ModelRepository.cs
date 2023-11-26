using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ModelRepository : Repository<Model>, IModelRepository
    {
        private readonly IMapper _mapper;
        public ModelRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public ModelDto GetDto(Model entity)
        {
            return _mapper.Map<ModelDto>(entity);
        }
        public List<ModelDto> GetDtos(List<Model> entities)
        {
            var dtos = new List<ModelDto>();
            dtos = _mapper.Map<List<ModelDto>>(entities);
            return dtos;
        }
        public async Task<List<ModelDto>> GetAllDtos()
        {
            var entities = await dbContext.Models.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
