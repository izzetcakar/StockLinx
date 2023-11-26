using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        SupplierDto GetSupplierDto(Supplier supplier);
        List<SupplierDto> GetSupplierDtos(List<Supplier> suppliers);
        Task<List<SupplierDto>> GetAllSupplierDtos();
    }
}
