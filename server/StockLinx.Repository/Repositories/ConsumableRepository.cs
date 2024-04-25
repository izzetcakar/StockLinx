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
            var deployedProducts = await dbContext
                .DeployedProducts.Where(d => d.ConsumableId.HasValue && d.ConsumableId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Sum(d => d.Quantity);
            var dto = _mapper.Map<ConsumableDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<ConsumableDto>> GetDtosAsync(List<Consumable> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
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
            var entity = dbContext.Consumables.Find(id);
            if (entity == null)
            {
                throw new Exception("Consumable not found.");
            }
            var deployedProducts = await dbContext.DeployedProducts.AnyAsync(d => d.ConsumableId.HasValue && d.ConsumableId == id);
            if (deployedProducts)
            {
                throw new Exception("Cannot delete consumable because it is used in deployed products.");
            }
            return true;
        }

        public async Task<int> GetAvaliableQuantityAsync(Consumable entity)
        {
            List<DeployedProduct> deployedProducts = await dbContext.DeployedProducts.ToListAsync();
            int availableQuantity = entity.Quantity - deployedProducts.Count(d =>
                    d.ConsumableId.HasValue && d.ConsumableId == entity.Id
                );
            return availableQuantity;
        }
    }
}
