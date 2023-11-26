using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IProductStatusRepository : IRepository<ProductStatus>
    {
        ProductStatusDto GetProductStatusDto(ProductStatus productStatus);
        List<ProductStatusDto> GetProductStatusDtos(List<ProductStatus> productStatuss);
        Task<List<ProductStatusDto>> GetAllProductStatusDtos();
    }
}
