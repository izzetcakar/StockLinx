using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IEmployeeProductRepository : IRepository<EmployeeProduct>
    {
        Task<EmployeeProductDto> GetDtoAsync(EmployeeProduct entity);
        Task<List<EmployeeProductDto>> GetDtosAsync(List<EmployeeProduct> entities);
        Task<List<EmployeeProductDto>> GetAllDtosAsync();
        Task<List<EmployeeProductDisplayDto>> GetDisplayDtos(List<Guid> ids);
        Task<string> GetProductTag(EmployeeProduct employeeProduct);
        Task<string> GetroductDescription(EmployeeProduct employeeProduct);
        Task<List<EmployeeProduct>> GetAllByCompanies(List<Guid> companyIds);
    }
}
