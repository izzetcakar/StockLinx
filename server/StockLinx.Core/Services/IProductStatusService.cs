using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IProductStatusService : IService<ProductStatus>
    {
        Task<List<ProductStatusDto>> GetAllDtos();
        Task<ProductStatusDto> CreateProductStatusAsync(ProductStatusCreateDto createDto);
        Task<List<ProductStatusDto>> CreateRangeProductStatusAsync(List<ProductStatusCreateDto> createDtos);
        Task UpdateProductStatusAsync(ProductStatusUpdateDto updateDto);
        Task DeleteProductStatusAsync(Guid productStatusId);
        Task DeleteRangeProductStatusAsync(List<Guid> productStatusIds);
    }
}
