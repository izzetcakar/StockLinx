using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IProductStatusService : IService<ProductStatus>
    {
        Task CreateProductStatusAsync(ProductStatusCreateDto createDto);
        Task UpdateProductStatusAsync(ProductStatusUpdateDto updateDto);
        Task DeleteProductStatusAsync(Guid productStatusId);
    }
}
