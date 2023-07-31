using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDeployedProductService : IService<DeployedProduct>
    {
        Task CreateDeployedProductAsync(DeployedProductCreateDto createDto);
        Task UpdateDeployedProductAsync(DeployedProductUpdateDto updateDto);
        Task DeleteDeployedProductAsync(Guid deployedProductId);
    }
}
