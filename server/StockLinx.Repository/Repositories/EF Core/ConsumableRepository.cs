﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ConsumableRepository : Repository<Consumable>, IConsumableRepository
    {
        private readonly IMapper _mapper;
        public ConsumableRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<ConsumableDto> GetDto(Consumable entity)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Count(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id);
            if (companyId == null)
            {
                return null;
            }
            var dto = _mapper.Map<ConsumableDto>(entity);
            dto.CompanyId = companyId;
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }
        public async Task<List<ConsumableDto>> GetDtos(List<Consumable> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var dtos = new List<ConsumableDto>();

            foreach (Consumable entity in entities)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                var availableQuantity = entity.Quantity - deployedProducts.Count(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id);
                if (companyId == null)
                {
                    continue;
                }
                var dto = _mapper.Map<ConsumableDto>(entity);
                dto.CompanyId = companyId;
                dto.AvailableQuantity = availableQuantity;
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<ConsumableDto>> GetAllDtos()
        {
            var entities = await dbContext.Consumables.AsNoTracking().ToListAsync();
            return await GetDtos(entities);
        }
    }
}
