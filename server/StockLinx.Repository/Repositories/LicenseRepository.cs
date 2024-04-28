using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class LicenseRepository : Repository<License>, ILicenseRepository
    {
        private readonly IMapper _mapper;

        public LicenseRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<LicenseDto> GetDtoAsync(License entity)
        {
            var userProducts = await dbContext
                .UserProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var assetProducts = await dbContext
                .AssetProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity =
                entity.Quantity
                - userProducts.Sum(up => up.Quantity)
                - assetProducts.Sum(ap => ap.Quantity);
            var dto = _mapper.Map<LicenseDto>(entity);
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }

        public async Task<List<LicenseDto>> GetDtosAsync(List<License> entities)
        {
            var dtos = new List<LicenseDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<LicenseDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Licenses.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            var entity = dbContext.Licenses.Find(id);
            if (entity == null)
            {
                throw new Exception("License not found.");
            }
            bool userProducts = await dbContext.UserProducts.AnyAsync(up =>
                up.LicenseId.HasValue && up.LicenseId == id
            );
            if (userProducts)
            {
                throw new Exception("Cannot delete license because it is used in user products.");
            }
            bool assetProducts = await dbContext.AssetProducts.AnyAsync(ap =>
                ap.LicenseId.HasValue && ap.LicenseId == id
            );
            if (assetProducts)
            {
                throw new Exception("Cannot delete license because it is used in asset products.");
            }
            return true;
        }

        public async Task<int> GetAvaliableQuantityAsync(License entity)
        {
            List<UserProduct> userProducts = await dbContext
                .UserProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .ToListAsync();
            List<AssetProduct> assetProducts = await dbContext
                .AssetProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .ToListAsync();
            int availableQuantity =
                entity.Quantity
                - userProducts.Sum(d => d.Quantity)
                - assetProducts.Sum(d => d.Quantity);
            return availableQuantity;
        }
    }
}
