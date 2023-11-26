using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IDeployedProductRepository : IRepository<DeployedProduct>
    {
        DeployedProductDto GetDto(DeployedProduct entity);
        List<DeployedProductDto> GetDtos(List<DeployedProduct> entities);
        Task<List<DeployedProductDto>> GetAllDtos();
    }
}
