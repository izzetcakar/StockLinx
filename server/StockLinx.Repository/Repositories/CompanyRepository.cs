﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        private readonly IMapper _mapper;

        public CompanyRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public CompanyDto GetDto(Company entity)
        {
            return _mapper.Map<CompanyDto>(entity);
        }

        public List<CompanyDto> GetDtos(List<Company> entities)
        {
            var dtos = new List<CompanyDto>();
            dtos = _mapper.Map<List<CompanyDto>>(entities);
            return dtos;
        }

        public async Task<List<CompanyDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Companies.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            await CheckExistAsync(id);
            bool assets = await dbContext.Assets.AnyAsync(a => a.Branch.CompanyId == id);
            bool accessories = await dbContext.Accessories.AnyAsync(a => a.Branch.CompanyId == id);
            bool components = await dbContext.Components.AnyAsync(c => c.Branch.CompanyId == id);
            bool consumables = await dbContext.Consumables.AnyAsync(c => c.Branch.CompanyId == id);
            bool licenses = await dbContext.Licenses.AnyAsync(l => l.Branch.CompanyId == id);

            if (assets || accessories || components || consumables || licenses)
            {
                throw new Exception("Cannot delete company because it has items.");
            }
            bool userProducts = await dbContext.UserProducts.AnyAsync(d =>
                d.User.Department.Branch.CompanyId == id
            );
            if (userProducts)
            {
                throw new Exception(
                    "Cannot delete company because it is used in user products."
                );
            }
            bool users = await dbContext.Users.AnyAsync(u => u.Department.Branch.CompanyId == id);
            if (users)
            {
                throw new Exception("Cannot delete company because it has users.");
            }
            bool departments = await dbContext.Departments.AnyAsync(d => d.Branch.CompanyId == id);
            if (departments)
            {
                throw new Exception("Cannot delete company because it has departments.");
            }
            bool permissions = await dbContext.Permissions.AnyAsync(p => p.Branch.CompanyId == id);
            if (permissions)
            {
                throw new Exception("Cannot delete company because it has permissions.");
            }

            return true;
        }
    }
}
