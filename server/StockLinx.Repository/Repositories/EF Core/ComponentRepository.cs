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

        public async Task<ComponentDto> GetComponentDto(Component component)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == component.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            var availableQuantity = component.Quantity - deployedProducts.Count(d => d.ComponentId.HasValue && d.ComponentId == component.Id);
            if (companyId == null)
            {
                return null;
            }
            var componentDto = _mapper.Map<ComponentDto>(component);
            componentDto.CompanyId = companyId;
            componentDto.AvailableQuantity = availableQuantity;
            return componentDto;
        }
        public async Task<List<ComponentDto>> GetComponentDtos(List<Component> components)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var componentDtos = new List<ComponentDto>();

            foreach (var component in components)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == component.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                var availableQuantity = component.Quantity - deployedProducts.Count(d => d.ComponentId.HasValue && d.ComponentId == component.Id);
                if (companyId == null)
                {
                    continue;
                }
                var componentDto = _mapper.Map<ComponentDto>(component);
                componentDto.CompanyId = companyId;
                componentDto.AvailableQuantity = availableQuantity;
                componentDtos.Add(componentDto);
            }
            return componentDtos;
        }
        public async Task<List<ComponentDto>> GetAllComponentDtos()
        {
            var components = await dbContext.Components.AsNoTracking().ToListAsync();
            return await GetComponentDtos(components);
        }
    }
}
