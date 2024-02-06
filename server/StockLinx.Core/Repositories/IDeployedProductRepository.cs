using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IDeployedProductRepository : IRepository<DeployedProduct>
    {
        Task<DeployedProductDto> GetDto(DeployedProduct entity);
        Task<List<DeployedProductDto>> GetDtos(List<DeployedProduct> entities);
        Task<List<DeployedProductDto>> GetAllDtos();
    }
}
