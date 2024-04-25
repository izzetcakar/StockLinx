using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDepartmentService : IService<Department>
    {
        Task<DepartmentDto> GetDtoAsync(Guid id);
        Task<List<DepartmentDto>> GetAllDtosAsync();
        Task<DepartmentDto> CreateDepartmentAsync(DepartmentCreateDto dto);
        Task<List<DepartmentDto>> CreateRangeDepartmentAsync(List<DepartmentCreateDto> dtos);
        Task<DepartmentDto> UpdateDepartmentAsync(DepartmentUpdateDto dto);
        Task DeleteDepartmentAsync(Guid id);
        Task DeleteRangeDepartmentAsync(List<Guid> id);
    }
}
