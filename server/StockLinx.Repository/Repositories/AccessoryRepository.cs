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

        public AccessoryRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<AccessoryDto> GetDto(Accessory entity)
        {
            var deployedProducts = await dbContext
                .DeployedProducts.Where(d => d.AccessoryId.HasValue && d.AccessoryId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Sum(d => d.Quantity);
            var dto = _mapper.Map<AccessoryDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<AccessoryDto>> GetDtos(List<Accessory> entities)
        {
            var dtos = new List<AccessoryDto>();

            foreach (var entity in entities)
            {
                var dto = await GetDto(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<AccessoryDto>> GetAllDtos()
        {
            var entities = await dbContext.Accessories.AsNoTracking().ToListAsync();
            return await GetDtos(entities);
        }

        public async Task<bool> CanDelete(Guid id)
        {
            var entity = dbContext.Accessories.Find(id);
            if (entity == null)
            {
                throw new Exception("Accessory not found.");
            }
            var deployedProducts = await dbContext.DeployedProducts.AnyAsync(d => d.AccessoryId.HasValue && d.AccessoryId == id);
            if (deployedProducts)
            {
                throw new Exception("Cannot delete accessory because it is used in deployed products.");
            }
            return true;
        }
    }
}
