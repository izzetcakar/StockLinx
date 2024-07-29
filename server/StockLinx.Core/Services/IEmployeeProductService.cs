using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IEmployeeProductService : IService<EmployeeProduct>
    {
        Task<EmployeeProductDto> GetDtoAsync(Guid id);
        Task<List<EmployeeProductDto>> GetAllDtosAsync();
        Task<EmployeeProductDto> CreateEmployeeProductAsync(EmployeeProductCreateDto dto);
        Task<List<EmployeeProductDto>> CreateRangeEmployeeProductAsync(
            List<EmployeeProductCreateDto> dtos
        );
        Task DeleteEmployeeProductAsync(Guid id);
        Task<List<EmployeeProductDto>> FilterAllAsync(string filter);
        Task<List<EmployeeProductDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
