using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        CategoryDto GetDto(Category entity);
        List<CategoryDto> GetDtos(List<Category> entities);
        Task<List<CategoryDto>> GetAllDtos();
    }
}
