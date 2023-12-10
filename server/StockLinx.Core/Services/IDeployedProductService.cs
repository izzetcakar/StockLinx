using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDeployedProductService : IService<DeployedProduct>
    {
        Task<DeployedProductDto> GetDto(Guid id);
        Task<List<DeployedProductDto>> GetAllDtos();
        Task<DeployedProductDto> CreateDeployedProductAsync(DeployedProductCreateDto createDto);
        Task<List<DeployedProductDto>> CreateRangeDeployedProductAsync(List<DeployedProductCreateDto> createDtos);
        Task DeleteDeployedProductAsync(Guid deployedProductId);
    }
}
