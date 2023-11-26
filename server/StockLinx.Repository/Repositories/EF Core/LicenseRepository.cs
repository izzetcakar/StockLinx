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

        public async Task<LicenseDto> GetLicenseDto(License license)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var companyId = await dbContext.Branches.Where(b => b.Id == license.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
            var availableQuantity = license.Quantity - deployedProducts.Count(d => d.LicenseId.HasValue && d.LicenseId == license.Id);
            if (companyId == null)
            {
                return null;
            }
            var licenseDto = _mapper.Map<LicenseDto>(license);
            licenseDto.CompanyId = companyId;
            licenseDto.AvailableQuantity = availableQuantity;
            return licenseDto;
        }
        public async Task<List<LicenseDto>> GetLicenseDtos(List<License> licenses)
        {
            var deployedProducts = await dbContext.DeployedProducts.AsNoTracking().ToListAsync();
            var licenseDtos = new List<LicenseDto>();

            foreach (var license in licenses)
            {
                var companyId = await dbContext.Branches.Where(b => b.Id == license.BranchId).Select(b => b.CompanyId).FirstOrDefaultAsync();
                var availableQuantity = license.Quantity - deployedProducts.Count(d => d.LicenseId.HasValue && d.LicenseId == license.Id);
                if (companyId == null)
                {
                    continue;
                }
                var licenseDto = _mapper.Map<LicenseDto>(license);
                licenseDto.CompanyId = companyId;
                licenseDto.AvailableQuantity = availableQuantity;
                licenseDtos.Add(licenseDto);
            }
            return licenseDtos;
        }
        public async Task<List<LicenseDto>> GetAllLicenseDtos()
        {
            var licenses = await dbContext.Licenses.AsNoTracking().ToListAsync();
            return await GetLicenseDtos(licenses);
        }
    }
}
