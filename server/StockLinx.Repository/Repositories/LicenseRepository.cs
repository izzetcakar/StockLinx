﻿using AutoMapper;
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

        public async Task<string> GetEmployeeName(EmployeeProduct employeeProduct)
        {
            return await dbContext
                .Employees.Where(a => a.Id == employeeProduct.EmployeeId)
                .Select(a => a.FirstName + " " + a.LastName)
                .FirstOrDefaultAsync();
        }

        public async Task<string> GetAssetTag(AssetProduct assetProduct)
        {
            return await dbContext
                .Assets.Where(a => a.Id == assetProduct.AssetId)
                .Select(a => a.Tag)
                .FirstOrDefaultAsync();
        }

        public async Task<List<LicenseProductDisplayDto>> GetProductDisplayDtos(List<Guid> ids)
        {
            var assetProducts = await dbContext
                .AssetProducts.Where(a => ids.Contains(a.Id))
                .ToListAsync();
            var employeeProducts = await dbContext
                .EmployeeProducts.Where(a => ids.Contains(a.Id))
                .ToListAsync();
            var displayDtos = new List<LicenseProductDisplayDto>();

            foreach (var item in assetProducts)
            {
                var assetTag = await GetAssetTag(item);
                var license = await dbContext
                    .Licenses.Where(a => a.Id == item.LicenseId)
                    .FirstOrDefaultAsync();
                displayDtos.Add(
                    new LicenseProductDisplayDto
                    {
                        License = license.Tag,
                        Owner = assetTag,
                        Quantity = item.Quantity,
                        Seat = "Seat 1",
                        AssignDate = item.AssignDate,
                        Notes = item.Notes,
                    }
                );
            }
            foreach (var item in employeeProducts)
            {
                var employeeName = await GetEmployeeName(item);
                var license = await dbContext
                    .Licenses.Where(a => a.Id == item.LicenseId)
                    .FirstOrDefaultAsync();
                displayDtos.Add(
                    new LicenseProductDisplayDto
                    {
                        License = license.Tag,
                        Owner = employeeName,
                        Quantity = item.Quantity,
                        Seat = "Seat 1",
                        AssignDate = item.AssignDate,
                        Notes = item.Notes,
                    }
                );
            }
            displayDtos = displayDtos
                .OrderBy(d => d.AssignDate)
                .Select(
                    (d, i) =>
                    {
                        d.Seat = $"Seat {i + 1}";
                        return d;
                    }
                )
                .ToList();
            return displayDtos;
        }
    }
}
