using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        DepartmentDto GetDepartmentDto(Department department);
        List<DepartmentDto> GetDepartmentDtos(List<Department> departments);
        Task<List<DepartmentDto>> GetAllDepartmentDtos();
    }
}
