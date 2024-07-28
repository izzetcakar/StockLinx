using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        private readonly IMapper _mapper;

        public DepartmentRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public DepartmentDto GetDto(Department entity)
        {
            return _mapper.Map<DepartmentDto>(entity);
        }

        public List<DepartmentDto> GetDtos(List<Department> entities)
        {
            var dtos = new List<DepartmentDto>();
            dtos = _mapper.Map<List<DepartmentDto>>(entities);
            return dtos;
        }

        public async Task<List<DepartmentDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Departments.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }

        public async Task<List<DepartmentDto>> GetAllDtosAsync(List<Guid> companyIds)
        {
            var entities = await dbContext
                .Departments.Where(a => companyIds.Contains(a.CompanyId))
                .AsNoTracking()
                .ToListAsync();
            return GetDtos(entities);
        }

        public async Task CanDeleteAsync(Guid id)
        {
            bool employees = await dbContext.Employees.AnyAsync(u => u.DepartmentId == id);
            if (employees)
            {
                throw new Exception("Cannot delete department because it has employees.");
            }
        }

        public async Task<List<DepartmentDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Departments.Where(d => ids.Contains(d.Id))
                .Select(d => new DepartmentDisplayDto
                {
                    Name = d.Name,
                    Company = d.Company.Name,
                    Location = d.Location.Name,
                    Notes = d.Notes
                });
            return await query.ToListAsync();
        }
    }
}
