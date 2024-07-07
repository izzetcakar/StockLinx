using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class EmployeeRepository : Repository<Employee>, IEmployeeRepository
    {
        private readonly IMapper _mapper;

        public EmployeeRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<EmployeeDto> GetDtoAsync(Employee entity)
        {
            var dto = _mapper.Map<EmployeeDto>(entity);
            dto.CompanyId = await dbContext
                .Departments.Where(b => b.Id == dto.DepartmentId)
                .Select(b => b.CompanyId)
                .FirstOrDefaultAsync();
            return dto;
        }

        public async Task<List<EmployeeDto>> GetDtosAsync(IEnumerable<Employee> entities)
        {
            var dtos = new List<EmployeeDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<EmployeeDto>> GetAllDtosAsync()
        {
            List<Employee> entities = await dbContext.Employees.AsNoTracking().ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<List<EmployeeDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            List<Employee> entities = await dbContext
                .Employees.Where(a => companyIds.Contains(a.Department.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            var employeeProducts = await dbContext.EmployeeProducts.AnyAsync(dp =>
                dp.EmployeeId == id
            );
            if (employeeProducts)
            {
                throw new Exception("Employee has deployed items");
            }
        }

        public async Task<Guid> GetCompanyIdAsync(Guid employeeId)
        {
            return await dbContext
                .Departments.Where(b =>
                    b.Id
                    == dbContext
                        .Employees.Where(u => u.Id == employeeId)
                        .Select(u => u.DepartmentId)
                        .FirstOrDefault()
                )
                .Select(b => b.CompanyId)
                .FirstOrDefaultAsync();
        }
    }
}
