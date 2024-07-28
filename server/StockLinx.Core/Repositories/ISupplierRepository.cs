using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ISupplierRepository : IRepository<Supplier>
    {
        SupplierDto GetDto(Supplier entity);
        List<SupplierDto> GetDtos(List<Supplier> entities);
        Task<List<SupplierDto>> GetAllDtosAsync();
        Task<List<SupplierDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
