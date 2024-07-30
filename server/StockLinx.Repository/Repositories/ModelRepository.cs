using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ModelRepository : Repository<Model>, IModelRepository
    {
        private readonly IMapper _mapper;

        public ModelRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public ModelDto GetDto(Model entity)
        {
            var dto = _mapper.Map<ModelDto>(entity);
            return dto;
        }

        public List<ModelDto> GetDtos(List<Model> entities)
        {
            var dtos = new List<ModelDto>();
            foreach (var entity in entities)
            {
                dtos.Add(GetDto(entity));
            }
            return dtos;
        }

        public async Task<List<ModelDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Models.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
