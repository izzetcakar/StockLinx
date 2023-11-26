using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class AccessoryRepository : Repository<Accessory>, IAccessoryRepository
    {
        private readonly IMapper _mapper;
        public AccessoryRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<AccessoryDto> GetAccessoryDto(Accessory accessory)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == accessory.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            if (companyId == null)
            {
                return null;
            }
            var availableQuantity = accessory.Quantity - deployedProducts.Count(d => d.AccessoryId.HasValue && d.AccessoryId == accessory.Id);
            var accessoryDto = _mapper.Map<AccessoryDto>(accessory);
            accessoryDto.CompanyId = companyId;
            accessoryDto.AvailableQuantity = availableQuantity;
            return accessoryDto;
        }
        public async Task<List<AccessoryDto>> GetAccessoryDtos(List<Accessory> accessories)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var accessoryDtos = new List<AccessoryDto>();

            foreach (var accessory in accessories)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == accessory.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                if (companyId == null)
                {
                    continue;
                }
                var availableQuantity = accessory.Quantity - deployedProducts
                    .Count(d => d.AccessoryId.HasValue && d.AccessoryId == accessory.Id);
                var accessoryDto = _mapper.Map<AccessoryDto>(accessory);
                accessoryDto.CompanyId = companyId;
                accessoryDto.AvailableQuantity = availableQuantity;
                accessoryDtos.Add(accessoryDto);
            }
            return accessoryDtos;
        }
        public async Task<List<AccessoryDto>> GetAllAccessoryDtos()
        {
            var accessories = await dbContext.Accessories.AsNoTracking().ToListAsync();
            return await GetAccessoryDtos(accessories);
        }
    }
}
