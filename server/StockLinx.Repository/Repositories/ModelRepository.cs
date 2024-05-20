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
            var modelFieldData = new List<ModelFieldDataDto>();
            modelFieldData = dbContext
                .ModelFieldDatas.Where(x => x.ModelId == entity.Id)
                .Select(x => new ModelFieldDataDto
                {
                    Id = x.Id,
                    ModelId = x.ModelId,
                    CustomFieldId = x.CustomFieldId,
                    Value = x.Value,
                    CreatedDate = x.CreatedDate,
                    UpdatedDate = x.UpdatedDate,
                })
                .ToList();
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

        public async Task<List<ModelDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Models.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async void UpdateModel(ModelUpdateDto dto)
        {
            var entity = await GetByIdAsync(dto.Id);
            var updatedEntity = _mapper.Map<Model>(dto);
            updatedEntity.UpdatedDate = DateTime.UtcNow;
            Update(entity, updatedEntity);
            var itemsToAdd = new List<ModelFieldData>();
            var itemsToDelete = new List<ModelFieldData>();
            var itemsInDb = dbContext.ModelFieldDatas.Where(x => x.ModelId == dto.Id).ToList();
            foreach (var item in itemsInDb)
            {
                var itemDto = dto.ModelFieldData.SingleOrDefault(x => x.Id == item.Id);
                var isExist = dto.ModelFieldData.Any(x => x.Id == item.Id);
                if (!isExist)
                {
                    itemsToDelete.Add(item);
                }
                else
                {
                    if (item.Value != itemDto?.Value)
                    {
                        item.Value = itemDto.Value;
                        item.UpdatedDate = DateTime.UtcNow;
                        dbContext.ModelFieldDatas.Update(item);
                    }
                }
            }
            var idsInDb = itemsInDb.Select(x => x.Id);
            itemsToAdd.AddRange(
                dto.ModelFieldData.Where(x => !idsInDb.Contains(x.Id))
                    .Select(x => new ModelFieldData
                    {
                        Id = x.Id,
                        ModelId = x.ModelId,
                        CustomFieldId = x.CustomFieldId,
                        Value = x.Value,
                        CreatedDate = x.CreatedDate,
                        UpdatedDate = x.UpdatedDate,
                    })
            );
            dbContext.ModelFieldDatas.AddRange(itemsToAdd);
            dbContext.ModelFieldDatas.RemoveRange(itemsToDelete);
        }

        public ModelDto CreateModel(ModelCreateDto dto)
        {
            Model model = new Model()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = null,
                CategoryId = dto.CategoryId,
                FieldSetId = dto.FieldSetId,
                ImagePath = dto.ImagePath,
                ManufacturerId = dto.ManufacturerId,
                ModelNo = dto.ModelNo,
                Name = dto.Name,
                Notes = dto.Notes,
            };

            if (dto.ModelFieldData != null && dto.ModelFieldData.Any())
            {
                var itemsToAdd = new List<ModelFieldData>();
                foreach (var item in dto.ModelFieldData)
                {
                    ModelFieldData modelFieldData = new ModelFieldData()
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.UtcNow,
                        UpdatedDate = null,
                        CustomFieldId = item.CustomFieldId,
                        ModelId = model.Id,
                        Value = item.Value,
                    };
                    itemsToAdd.Add(modelFieldData);
                }
                dbContext.ModelFieldDatas.AddRange(itemsToAdd);
            }
            model.ModelFieldData = null;
            dbContext.Models.Add(model);
            return GetDto(model);
        }
    }
}
