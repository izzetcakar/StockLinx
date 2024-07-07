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

        public ComponentRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<ComponentDto> GetDtoAsync(Component entity)
        {
            var assetProducts = await dbContext
                .AssetProducts.Where(d => d.ComponentId.HasValue && d.ComponentId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - assetProducts.Sum(d => d.Quantity);
            var dto = _mapper.Map<ComponentDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<ComponentDto>> GetDtosAsync(List<Component> entities)
        {
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

        public async Task<List<ComponentDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            var entities = await dbContext.Components
                .Where(a => companyIds.Contains(a.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            bool assetProducts = await dbContext.AssetProducts.AnyAsync(d =>
                d.ComponentId.HasValue && d.ComponentId == id
            );
            if (assetProducts)
            {
                throw new Exception(
                    "Cannot delete component because it is has deployed to an asset."
                );
            }
        }

        public async Task<int> GetAvaliableQuantityAsync(Component entity)
        {
            List<AssetProduct> assetProducts = await dbContext
                .AssetProducts.Where(d => d.ComponentId.HasValue && d.ComponentId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            int availableQuantity = entity.Quantity - assetProducts.Sum(d => d.Quantity);
            return availableQuantity;
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await dbContext.Components.AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = dbContext
                .Components.Where(d => tags.Contains(d.Tag))
                .Select(d => d.Tag)
                .ToList();
            throw new Exception($"Tags {string.Join("\n", existingTags)} already exist.");
        }
    }
}
