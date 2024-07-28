using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IEmployeeRepository : IRepository<Employee>
    {

        Task<EmployeeDto> GetDtoAsync(Employee entity);
        Task<List<EmployeeDto>> GetDtosAsync(IEnumerable<Employee> entities);
        Task<List<EmployeeDto>> GetAllDtosAsync();
        Task<List<EmployeeDto>> GetAllDtosAsync(List<Guid> companyIds);
        Task CanDeleteAsync(Guid id);
        Task<Guid> GetCompanyIdAsync(Guid employeeId);
        Task<List<EmployeeDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
