﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ComponentRepository : Repository<Component>, IComponentRepository
    {
        private readonly IMapper _mapper;

        public ComponentRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<ComponentDto> GetDtoAsync(Component entity)
        {
            var deployedProducts = await dbContext
                .DeployedProducts.Where(d => d.ComponentId.HasValue && d.ComponentId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Sum(d => d.Quantity);
            var dto = _mapper.Map<ComponentDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<ComponentDto>> GetDtosAsync(List<Component> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var dtos = new List<ComponentDto>();

            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<ComponentDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Components.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            var entity = dbContext.Components.Find(id);
            if (entity == null)
            {
                throw new Exception("Component not found.");
            }
            var deployedProducts = await dbContext.DeployedProducts.AnyAsync(d => d.ComponentId.HasValue && d.ComponentId == id);
            if (deployedProducts)
            {
                throw new Exception("Cannot delete component because it is used in deployed products.");
            }
            return true;
        }

        public async Task<int> GetAvaliableQuantityAsync(Component entity)
        {
            List<DeployedProduct> deployedProducts = await dbContext.DeployedProducts.ToListAsync();
            int availableQuantity = entity.Quantity - deployedProducts.Count(d =>
                    d.ComponentId.HasValue && d.ComponentId == entity.Id
                );
            return availableQuantity;
        }
    }
}