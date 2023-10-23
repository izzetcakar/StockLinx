using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICategoryService : IService<Category>
    {
        Task<List<CategoryDto>> GetCategoryDtos();
        Task CreateCategoryAsync(CategoryCreateDto createDto);
        Task UpdateCategoryAsync(CategoryUpdateDto updateDto);
        Task DeleteCategoryAsync(Guid categoryId);
        Task<List<ProductCategoryCounterDto>> GetCounts();
    }
}
