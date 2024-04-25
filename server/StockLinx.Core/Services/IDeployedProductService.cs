using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IDeployedProductService : IService<DeployedProduct>
    {
        Task<DeployedProductDto> GetDtoAsync(Guid id);
        Task<List<DeployedProductDto>> GetAllDtosAsync();
        Task<DeployedProductDto> CreateDeployedProductAsync(DeployedProductCreateDto dto);
        Task<List<DeployedProductDto>> CreateRangeDeployedProductAsync(List<DeployedProductCreateDto> dtos);
        Task DeleteDeployedProductAsync(Guid id);
    }
}
