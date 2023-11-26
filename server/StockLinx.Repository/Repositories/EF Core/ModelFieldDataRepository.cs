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

        public ModelFieldDataDto GetModelFieldDataDto(ModelFieldData modelFieldData)
        {
            var modelFieldDataDto = _mapper.Map<ModelFieldDataDto>(modelFieldData);
            return modelFieldDataDto;
        }
        public List<ModelFieldDataDto> GetModelFieldDataDtos(List<ModelFieldData> modelFieldDatas)
        {
            var modelFieldDataDtos = new List<ModelFieldDataDto>();
            modelFieldDataDtos = _mapper.Map<List<ModelFieldDataDto>>(modelFieldDatas);
            return modelFieldDataDtos;
        }
        public async Task<List<ModelFieldDataDto>> GetAllModelFieldDataDtos()
        {
            var modelFieldDatas = await dbContext.ModelFieldDatas.AsNoTracking().ToListAsync();
            return GetModelFieldDataDtos(modelFieldDatas);
        }
    }
}
