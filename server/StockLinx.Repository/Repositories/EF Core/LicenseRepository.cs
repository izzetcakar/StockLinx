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
        public LicenseRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<LicenseDto> GetDto(License entity)
        {
            var deployedProducts = await dbContext.DeployedProducts.Where(d => d.DeletedDate == null).AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == entity.BranchId && b.DeletedDate == null).Select(b => b.CompanyId).FirstOrDefaultAsync();
            var availableQuantity = entity.Quantity - deployedProducts.Count(d => d.LicenseId.HasValue && d.LicenseId == entity.Id);
            if (companyId == null)
            {
                return null;
            }
            var dto = _mapper.Map<LicenseDto>(entity);
            dto.CompanyId = companyId;
            dto.AvailableQuantity = availableQuantity;
            return dto;
        }
        public async Task<List<LicenseDto>> GetDtos(List<License> entities)
        {
            var deployedProducts = await dbContext.DeployedProducts.Where(d => d.DeletedDate == null).AsNoTracking().ToListAsync();
            var dtos = new List<LicenseDto>();

            foreach (var license in entities)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == license.BranchId && b.DeletedDate == null).Select(b => b.CompanyId).FirstOrDefaultAsync();
                var availableQuantity = license.Quantity - deployedProducts.Count(d => d.LicenseId.HasValue && d.LicenseId == license.Id);
                if (companyId == null)
                {
                    continue;
                }
                var dto = _mapper.Map<LicenseDto>(license);
                dto.CompanyId = companyId;
                dto.AvailableQuantity = availableQuantity;
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<LicenseDto>> GetAllDtos()
        {
            var entities = await dbContext.Licenses.Where(l => l.DeletedDate == null).AsNoTracking().ToListAsync();
            return await GetDtos(entities);
        }
    }
}
