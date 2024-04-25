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
            var deployedProducts = await dbContext
                .DeployedProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Sum(d => d.Quantity);
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
            var deployedProducts = await dbContext.DeployedProducts.AnyAsync(d => d.LicenseId.HasValue && d.LicenseId == id);
            if (deployedProducts)
            {
                throw new Exception("Cannot delete license because it is used in deployed products.");
            }
            return true;
        }
        public async Task<int> GetAvaliableQuantityAsync(License entity)
        {
            List<DeployedProduct> deployedProducts = await dbContext.DeployedProducts.ToListAsync();
            int availableQuantity = entity.Quantity - deployedProducts.Count(d =>
                    d.LicenseId.HasValue && d.LicenseId == entity.Id
                );
            return availableQuantity;
        }
    }
}
