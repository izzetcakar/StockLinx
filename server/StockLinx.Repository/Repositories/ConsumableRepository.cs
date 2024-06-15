using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class ConsumableRepository : Repository<Consumable>, IConsumableRepository
    {
        private readonly IMapper _mapper;

        public ConsumableRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<ConsumableDto> GetDtoAsync(Consumable entity)
        {
            var userProducts = await dbContext
                .UserProducts.Where(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - userProducts.Sum(d => d.Quantity);
            var dto = _mapper.Map<ConsumableDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<ConsumableDto>> GetDtosAsync(List<Consumable> entities)
        {
            var dtos = new List<ConsumableDto>();

            foreach (Consumable entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<ConsumableDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Consumables.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            bool userProducts = await dbContext.UserProducts.AnyAsync(d =>
                d.ConsumableId.HasValue && d.ConsumableId == id
            );
            if (userProducts)
            {
                throw new Exception(
                    "Cannot delete consumable because it is used in user products."
                );
            }
            return true;
        }

        public async Task<int> GetAvaliableQuantityAsync(Consumable entity)
        {
            List<UserProduct> userProducts = await dbContext
                .UserProducts.Where(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            int availableQuantity = entity.Quantity - userProducts.Sum(up => up.Quantity);
            return availableQuantity;
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await dbContext.Consumables.AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = dbContext
                .Consumables.Where(d => tags.Contains(d.Tag))
                .Select(d => d.Tag)
                .ToList();
            throw new Exception($"Tags {string.Join("\n", existingTags)} already exist.");
        }
    }
}
