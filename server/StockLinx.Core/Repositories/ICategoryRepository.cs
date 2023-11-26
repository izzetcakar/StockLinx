using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        CategoryDto GetCategoryDto(Category category);
        List<CategoryDto> GetCategoryDtos(List<Category> categories);
        Task<List<CategoryDto>> GetAllCategoryDtos();
        Task<List<ProductCategoryCounterDto>> GetCounts();
    }
}
