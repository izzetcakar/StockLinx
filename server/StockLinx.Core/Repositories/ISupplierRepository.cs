using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        SupplierDto GetDto(Supplier entity);
        List<SupplierDto> GetDtos(List<Supplier> entities);
        Task<List<SupplierDto>> GetAllDtos();
    }
}
