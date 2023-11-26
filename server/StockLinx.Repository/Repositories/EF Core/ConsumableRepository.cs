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
        public ConsumableRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<ConsumableDto> GetConsumableDto(Consumable consumable)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == consumable.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            var availableQuantity = consumable.Quantity - deployedProducts.Count(d => d.ConsumableId.HasValue && d.ConsumableId == consumable.Id);
            if (companyId == null)
            {
                return null;
            }
            var consumableDto = _mapper.Map<ConsumableDto>(consumable);
            consumableDto.CompanyId = companyId;
            consumableDto.AvailableQuantity = availableQuantity;
            return consumableDto;
        }
        public async Task<List<ConsumableDto>> GetConsumableDtos(List<Consumable> consumables)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var consumableDtos = new List<ConsumableDto>();

            foreach (var consumable in consumables)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == consumable.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                var availableQuantity = consumable.Quantity - deployedProducts.Count(d => d.ConsumableId.HasValue && d.ConsumableId == consumable.Id);
                if (companyId == null)
                {
                    continue;
                }
                var consumableDto = _mapper.Map<ConsumableDto>(consumable);
                consumableDto.CompanyId = companyId;
                consumableDto.AvailableQuantity = availableQuantity;
                consumableDtos.Add(consumableDto);
            }
            return consumableDtos;
        }
        public async Task<List<ConsumableDto>> GetAllConsumableDtos()
        {
            var consumables = await dbContext.Consumables.AsNoTracking().ToListAsync();
            return await GetConsumableDtos(consumables);
        }
    }
}
