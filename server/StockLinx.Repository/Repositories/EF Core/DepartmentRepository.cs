using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class DepartmentRepository : Repository<Department>, IDepartmentRepository
    {
        private readonly IMapper _mapper;
        public DepartmentRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<List<DepartmentDto>> GetAllDepartmentDtos()
        {
            var departments = await dbContext.Departments.AsNoTracking().ToListAsync();
            return GetDepartmentDtos(departments);
        }

        public DepartmentDto GetDepartmentDto(Department department)
        {
            var departmentDto = _mapper.Map<DepartmentDto>(department);
            return departmentDto;
        }

        public List<DepartmentDto> GetDepartmentDtos(List<Department> departments)
        {
            var departmentDtos = new List<DepartmentDto>();
            departmentDtos = _mapper.Map<List<DepartmentDto>>(departments);
            return departmentDtos;
        }
    }
}
