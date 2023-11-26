using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ComponentRepository : Repository<Component>, IComponentRepository
    {
        private readonly IMapper _mapper;
        public ComponentRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<ComponentDto> GetDto(Component entity)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Count(d => d.ComponentId.HasValue && d.ComponentId == entity.Id);
            if (companyId == null)
            {
                return null;
            }
            var dto = _mapper.Map<ComponentDto>(entity);
            dto.CompanyId = companyId;
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }
        public async Task<List<ComponentDto>> GetDtos(List<Component> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var dtos = new List<ComponentDto>();

            foreach (var entity in entities)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                var availableQuantity = entity.Quantity - deployedProducts.Count(d => d.ComponentId.HasValue && d.ComponentId == entity.Id);
                if (companyId == null)
                {
                    continue;
                }
                var dto = _mapper.Map<ComponentDto>(entity);
                dto.CompanyId = companyId;
                dto.AvailableQuantity = availableQuantity;
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<ComponentDto>> GetAllDtos()
        {
            var entities = await dbContext.Components.AsNoTracking().ToListAsync();
            return await GetDtos(entities);
        }
    }
}
