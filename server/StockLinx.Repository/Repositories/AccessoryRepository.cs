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
            List<UserProduct> userProducts = await dbContext
                .UserProducts.Where(d => d.AccessoryId.HasValue && d.AccessoryId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            int availableQuantity = entity.Quantity - userProducts.Sum(d => d.Quantity);
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
            await CheckExistAsync(id);
            bool userProducts = await dbContext.UserProducts.AnyAsync(d =>
                d.AccessoryId.HasValue && d.AccessoryId == id
            );
            if (userProducts)
            {
                throw new Exception("Cannot delete accessory because it is used in user products.");
            }
            return true;
        }

        public async Task<int> GetAvaliableQuantityAsync(Accessory entity)
        {
            List<UserProduct> userProducts = await dbContext
                .UserProducts.Where(d => d.AccessoryId.HasValue && d.AccessoryId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            int availableQuantity = entity.Quantity - userProducts.Sum(up => up.Quantity);
            return availableQuantity;
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await dbContext.Accessories.AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = dbContext
                .Accessories.Where(d => tags.Contains(d.Tag))
                .Select(d => d.Tag)
                .ToList();
            throw new Exception($"Tags {string.Join("\n", existingTags)} already exist.");
        }
    }
}
