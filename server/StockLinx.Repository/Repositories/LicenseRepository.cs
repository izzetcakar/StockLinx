using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
            var employeeProducts = await dbContext
                .EmployeeProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var assetProducts = await dbContext
                .AssetProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .AsNoTracking()
                .ToListAsync();
            var availableQuantity =
                entity.Quantity
                - employeeProducts.Sum(up => up.Quantity)
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

        public async Task<List<LicenseDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            var entities = await dbContext
                .Licenses.Where(a => companyIds.Contains(a.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            bool employeeProducts = await dbContext.EmployeeProducts.AnyAsync(up =>
                up.LicenseId.HasValue && up.LicenseId == id
            );
            if (employeeProducts)
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
        }

        public async Task<int> GetAvaliableQuantityAsync(License entity)
        {
            List<EmployeeProduct> employeeProducts = await dbContext
                .EmployeeProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .ToListAsync();
            List<AssetProduct> assetProducts = await dbContext
                .AssetProducts.Where(d => d.LicenseId.HasValue && d.LicenseId == entity.Id)
                .ToListAsync();
            int availableQuantity =
                entity.Quantity
                - employeeProducts.Sum(d => d.Quantity)
                - assetProducts.Sum(d => d.Quantity);
            return availableQuantity;
        }

        public async Task CheckTagExistAsync(string tag)
        {
            tag = TagUtils.Check(tag);
            bool isExist = await dbContext.Licenses.AnyAsync(d => d.Tag == tag);
            if (isExist)
            {
                throw new Exception($"Tag {tag} already exist.");
            }
        }

        public Task CheckTagExistAsync(List<string> tags)
        {
            tags = TagUtils.Check(tags);
            var existingTags = dbContext
                .Licenses.Where(d => tags.Contains(d.Tag))
                .Select(d => d.Tag)
                .ToList();
            throw new Exception($"Tags {string.Join("\n", existingTags)} already exist.");
        }

        public async Task<List<LicenseDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Licenses.Where(a => ids.Contains(a.Id))
                .Select(a => new LicenseDisplayDto
                {
                    Name = a.Name,
                    Tag = a.Tag,
                    Quantity = a.Quantity,
                    AvailableQuantity =
                        a.Quantity
                        - a.EmployeeProducts.Sum(up => up.Quantity)
                        - a.AssetProducts.Sum(ap => ap.Quantity),
                    Category = a.Category.Name,
                    Company = a.Company.Name,
                    Supplier = a.Supplier.Name,
                    Manufacturer = a.Manufacturer.Name,
                    ExpirationDate = a.ExpirationDate,
                    PurchaseCost = a.PurchaseCost,
                    LicensedTo = a.LicensedTo,
                    LicenseEmail = a.LicenseEmail,
                    LicenseKey = a.LicenseKey,
                    Maintained = a.Maintained,
                    Notes = a.Notes,
                    OrderNo = a.OrderNo,
                    PurchaseDate = a.PurchaseDate,
                    Reassignable = a.Reassignable,
                    TerminationDate = a.TerminationDate,
                });
            return await query.ToListAsync();
        }
    }
}
