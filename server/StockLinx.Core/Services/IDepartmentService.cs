using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDepartmentService : IService<Department>
    {
        Task CreateDepartmentAsync(DepartmentCreateDto createDto);
    }
}
