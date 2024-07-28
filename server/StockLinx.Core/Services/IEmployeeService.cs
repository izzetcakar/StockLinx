using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IEmployeeService : IService<Employee>
    {
        Task<EmployeeDto> GetDtoAsync(Guid id);
        Task<List<EmployeeDto>> GetAllDtosAsync();
        Task<EmployeeDto> CreateEmployeeAsync(EmployeeCreateDto dto);
        Task<List<EmployeeDto>> CreateRangeEmployeeAsync(List<EmployeeCreateDto> dtos);
        Task<EmployeeDto> UpdateEmployeeAsync(EmployeeUpdateDto dto);
        Task DeleteEmployeeAsync(Guid id);
        Task DeleteRangeEmployeeAsync(List<Guid> ids);
        Task<List<EmployeeDto>> FilterAllAsync(string filter);
        Task<List<EmployeeDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
