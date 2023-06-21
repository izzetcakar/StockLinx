using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ISupplierService : IService<Supplier>
    {
        Task CreateSupplierAsync(SupplierCreateDto createDto);
    }
}
