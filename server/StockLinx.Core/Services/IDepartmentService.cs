using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDepartmentService : IService<Department>
    {
        Task<List<DepartmentDto>> GetDepartmentDtos();
        Task CreateDepartmentAsync(DepartmentCreateDto createDto);
        Task UpdateDepartmentAsync(DepartmentUpdateDto updateDto);
        Task DeleteDepartmentAsync(Guid departmentId);
    }
}
