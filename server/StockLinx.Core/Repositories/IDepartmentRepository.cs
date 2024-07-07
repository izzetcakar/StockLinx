using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IDepartmentRepository : IRepository<Department>
    {
        DepartmentDto GetDto(Department entity);
        List<DepartmentDto> GetDtos(List<Department> entities);
        Task<List<DepartmentDto>> GetAllDtosAsync();
        Task<List<DepartmentDto>> GetAllDtosAsync(List<Guid> companyIds);
        Task CanDeleteAsync(Guid id);
    }
}
