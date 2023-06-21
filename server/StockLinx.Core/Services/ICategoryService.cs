using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICategoryService : IService<Category>
    {
        Task CreateCategoryAsync(CategoryCreateDto createDto);
    }
}
