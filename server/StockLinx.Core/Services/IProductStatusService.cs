using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IProductStatusService : IService<ProductStatus>
    {
        Task<List<ProductStatusDto>> GetProductStatusDtos();
        Task CreateProductStatusAsync(ProductStatusCreateDto createDto);
        Task UpdateProductStatusAsync(ProductStatusUpdateDto updateDto);
        Task DeleteProductStatusAsync(Guid id);
    }
}
