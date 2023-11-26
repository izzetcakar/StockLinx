using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IDeployedProductRepository : IRepository<DeployedProduct>
    {
        DeployedProductDto GetDeployedProductDto(DeployedProduct deployedProduct);
        List<DeployedProductDto> GetDeployedProductDtos(List<DeployedProduct> deployedProducts);
        Task<List<DeployedProductDto>> GetAllDeployedProductDtos();
    }
}
