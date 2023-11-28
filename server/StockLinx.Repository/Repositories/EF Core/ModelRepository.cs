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
            var modelFieldData = new List<ModelFieldDataDto>();
            modelFieldData = dbContext.ModelFieldDatas.Where(x => x.ModelId == entity.Id).Select(x => new ModelFieldDataDto
            {
                Id = x.Id,
                ModelId = x.ModelId,
                CustomFieldId = x.CustomFieldId,
                Value = x.Value,
                CreatedDate = x.CreatedDate,
                UpdatedDate = x.UpdatedDate,
                DeletedDate = x.DeletedDate,
            }).ToList();
            var dto = _mapper.Map<ModelDto>(entity);
            dto.ModelFieldData = modelFieldData;
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
        public async Task<List<ModelDto>> GetAllDtos()
        {
            var entities = await dbContext.Models.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
