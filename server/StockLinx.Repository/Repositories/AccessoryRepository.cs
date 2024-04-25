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

        public async Task<AccessoryDto> GetDtoAsync(Accessory entity)
        {
            List<DeployedProduct> deployedProducts = await dbContext
                .DeployedProducts.Where(d => d.AccessoryId.HasValue && d.AccessoryId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            int availableQuantity = entity.Quantity - deployedProducts.Sum(d => d.Quantity);
            AccessoryDto dto = _mapper.Map<AccessoryDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<AccessoryDto>> GetDtosAsync(List<Accessory> entities)
        {
            List<AccessoryDto> dtos = new List<AccessoryDto>();

            foreach (Accessory entity in entities)
            {
                AccessoryDto dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<AccessoryDto>> GetAllDtosAsync()
        {
            List<Accessory> entities = await dbContext.Accessories.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
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

        public async Task<int> GetAvaliableQuantityAsync(Accessory entity)
        {
            List<DeployedProduct> deployedProducts = await dbContext.DeployedProducts.ToListAsync();
            int availableQuantity = entity.Quantity - deployedProducts.Count(d =>
                    d.AccessoryId.HasValue && d.AccessoryId == entity.Id
                );
            return availableQuantity;
        }
    }
}
