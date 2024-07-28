using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ISupplierService : IService<Supplier>
    {
        Task<SupplierDto> GetDtoAsync(Guid id);
        Task<List<SupplierDto>> GetAllDtosAsync();
        Task<SupplierDto> CreateSupplierAsync(SupplierCreateDto dto);
        Task<List<SupplierDto>> CreateRangeSupplierAsync(List<SupplierCreateDto> dtos);
        Task<SupplierDto> UpdateSupplierAsync(SupplierUpdateDto dto);
        Task DeleteSupplierAsync(Guid id);
        Task DeleteRangeSupplierAsync(List<Guid> ids);
        Task<List<SupplierDto>> FilterAllAsync(string filter);
        Task<List<SupplierDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
