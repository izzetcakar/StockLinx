using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IDeployedProductRepository : IRepository<DeployedProduct>
    {
        Task<DeployedProductDto> GetDtoAsync(DeployedProduct entity);
        Task<List<DeployedProductDto>> GetDtosAsync(List<DeployedProduct> entities);
        Task<List<DeployedProductDto>> GetAllDtosAsync();
    }
}
