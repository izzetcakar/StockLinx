using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        CategoryDto GetDto(Category entity);
        List<CategoryDto> GetDtos(List<Category> entities);
        Task<List<CategoryDto>> GetAllDtosAsync();
        Task<List<CategoryDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
