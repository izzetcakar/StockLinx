using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IProductStatusRepository : IRepository<ProductStatus>
    {
        ProductStatusDto GetDto(ProductStatus entity);
        List<ProductStatusDto> GetDtos(List<ProductStatus> entities);
        Task<List<ProductStatusDto>> GetAllDtos();
    }
}
