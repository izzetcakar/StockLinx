﻿using AutoMapper;
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

        public void UpdateModel(ModelUpdateDto dto)
        {
            var entity = dbContext.Models.SingleOrDefault(x => x.Id == dto.Id);
            if (entity == null)
            {
                throw new Exception("Model not found");
            }
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
            var entity = _mapper.Map<Model>(dto);
            entity.Id = Guid.NewGuid();
            entity.CreatedDate = DateTime.UtcNow;

            if (dto.ModelFieldData != null && dto.ModelFieldData.Any())
            {
                var itemsToAdd = new List<ModelFieldData>();
                foreach (var item in dto.ModelFieldData)
                {
                    var modelFieldData = _mapper.Map<ModelFieldData>(item);
                    modelFieldData.Id = Guid.NewGuid();
                    modelFieldData.CreatedDate = DateTime.UtcNow;
                    modelFieldData.ModelId = entity.Id;
                    itemsToAdd.Add(modelFieldData);
                }
                dbContext.ModelFieldDatas.AddRange(itemsToAdd);
            }
            entity.ModelFieldData = null;
            dbContext.Models.Add(entity);
            return GetDto(entity);
        }
    }
}
