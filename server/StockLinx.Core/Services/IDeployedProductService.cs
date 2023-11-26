using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDeployedProductService : IService<DeployedProduct>
    {
        Task<List<DeployedProductDto>> GetAllDeployedProductDtos();
        Task<DeployedProductDto> CreateDeployedProductAsync(DeployedProductCreateDto createDto);
        Task<List<DeployedProductDto>> CreateRangeDeployedProductAsync(List<DeployedProductCreateDto> createDtos);
        Task UpdateDeployedProductAsync(DeployedProductUpdateDto updateDto);
        Task DeleteDeployedProductAsync(Guid deployedProductId);
    }
}
