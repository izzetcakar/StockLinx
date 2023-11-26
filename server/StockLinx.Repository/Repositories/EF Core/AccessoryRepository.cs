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

        public async Task<AccessoryDto> GetDto(Accessory entity)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            if (companyId == null)
            {
                return null;
            }
            var availableQuantity = entity.Quantity - deployedProducts.Count(d => d.AccessoryId.HasValue && d.AccessoryId == entity.Id);
            var dto = _mapper.Map<AccessoryDto>(entity);
            dto.CompanyId = companyId;
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }
        public async Task<List<AccessoryDto>> GetDtos(List<Accessory> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var dtos = new List<AccessoryDto>();

            foreach (var entity in entities)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                if (companyId == null)
                {
                    continue;
                }
                var availableQuantity = entity.Quantity - deployedProducts
                    .Count(d => d.AccessoryId.HasValue && d.AccessoryId == entity.Id);
                var dto = _mapper.Map<AccessoryDto>(entity);
                dto.CompanyId = companyId;
                dto.AvailableQuantity = availableQuantity;
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<AccessoryDto>> GetAllDtos()
        {
            var entities = await dbContext.Accessories.AsNoTracking().ToListAsync();
            return await GetDtos(entities);
        }
    }
}
