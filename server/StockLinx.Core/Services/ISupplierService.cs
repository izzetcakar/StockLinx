using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ISupplierService : IService<Supplier>
    {
        Task<SupplierDto> GetDto(Guid id);
        Task<List<SupplierDto>> GetAllDtos();
        Task<SupplierDto> CreateSupplierAsync(SupplierCreateDto createDto);
        Task<List<SupplierDto>> CreateRangeSupplierAsync(List<SupplierCreateDto> createDtos);
        Task UpdateSupplierAsync(SupplierUpdateDto updateDto);
        Task DeleteSupplierAsync(Guid supplierId);
        Task DeleteRangeSupplierAsync(List<Guid> supplierIds);
    }
}
