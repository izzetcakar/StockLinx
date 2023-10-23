using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ISupplierService : IService<Supplier>
    {
        Task<List<SupplierDto>> GetSupplierDtos();
        Task CreateSupplierAsync(SupplierCreateDto createDto);
        Task UpdateSupplierAsync(SupplierUpdateDto updateDto);
        Task DeleteSupplierAsync(Guid supplierId);
    }
}
