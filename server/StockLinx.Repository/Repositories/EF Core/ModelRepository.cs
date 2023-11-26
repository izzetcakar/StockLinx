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

        public ModelDto GetModelDto(Model model)
        {
            var modelDto = _mapper.Map<ModelDto>(model);
            return modelDto;
        }
        public List<ModelDto> GetModelDtos(List<Model> models)
        {
            var modelDtos = new List<ModelDto>();
            modelDtos = _mapper.Map<List<ModelDto>>(models);
            return modelDtos;
        }
        public async Task<List<ModelDto>> GetAllModelDtos()
        {
            var models = await dbContext.Models.AsNoTracking().ToListAsync();
            return GetModelDtos(models);
        }
    }
}
