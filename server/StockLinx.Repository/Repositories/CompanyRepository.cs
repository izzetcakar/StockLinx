using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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

        public async Task CanDeleteAsync(Guid id)
        {
            bool assets = await dbContext.Assets.AnyAsync(a => a.CompanyId == id);
            bool accessories = await dbContext.Accessories.AnyAsync(a => a.CompanyId == id);
            bool components = await dbContext.Components.AnyAsync(c => c.CompanyId == id);
            bool consumables = await dbContext.Consumables.AnyAsync(c => c.CompanyId == id);
            bool licenses = await dbContext.Licenses.AnyAsync(l => l.CompanyId == id);

            if (assets || accessories || components || consumables || licenses)
            {
                throw new Exception("Cannot delete company because it has items.");
            }
            bool employeeProducts = await dbContext.EmployeeProducts.AnyAsync(d =>
                d.Employee.Department.CompanyId == id
            );
            if (employeeProducts)
            {
                throw new Exception("Cannot delete company because it is used in user products.");
            }
            bool employees = await dbContext.Employees.AnyAsync(u => u.Department.CompanyId == id);
            if (employees)
            {
                throw new Exception("Cannot delete company because it has users.");
            }
            bool departments = await dbContext.Departments.AnyAsync(d => d.CompanyId == id);
            if (departments)
            {
                throw new Exception("Cannot delete company because it has departments.");
            }
            bool permissions = await dbContext.Permissions.AnyAsync(p => p.CompanyId == id);
            if (permissions)
            {
                throw new Exception("Cannot delete company because it has permissions.");
            }
        }

        public async Task<List<CompanyDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Companies.Where(c => ids.Contains(c.Id))
                .Select(c => new CompanyDisplayDto
                {
                    Name = c.Name,
                    Tag = c.Tag,
                    Email = c.Email,
                    Location = c.Location.Name,
                });
            return await query.ToListAsync();
        }
    }
}
