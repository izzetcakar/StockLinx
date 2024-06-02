using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IProductStatusService : IService<ProductStatus>
    {
        Task<ProductStatusDto> GetDtoAsync(Guid id);
        Task<List<ProductStatusDto>> GetAllDtosAsync();
        Task<ProductStatusDto> CreateProductStatusAsync(ProductStatusCreateDto dto);
        Task<List<ProductStatusDto>> CreateRangeProductStatusAsync(List<ProductStatusCreateDto> dtos);
        Task<ProductStatusDto> UpdateProductStatusAsync(ProductStatusUpdateDto dto);
        Task DeleteProductStatusAsync(Guid id);
        Task DeleteRangeProductStatusAsync(List<Guid> ids);
        Task<List<ProductStatusDto>> FilterAllAsync(string filter);
    }
}
