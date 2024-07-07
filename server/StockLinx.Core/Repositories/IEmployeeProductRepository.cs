using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IEmployeeProductRepository : IRepository<EmployeeProduct>
    {
        Task<EmployeeProductDto> GetDtoAsync(EmployeeProduct entity);
        Task<List<EmployeeProductDto>> GetDtosAsync(List<EmployeeProduct> entities);
        Task<List<EmployeeProductDto>> GetAllDtosAsync();
    }
}
