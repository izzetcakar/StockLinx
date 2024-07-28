using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ICategoryService : IService<Category>
    {
        Task<CategoryDto> GetDtoAsync(Guid id);
        Task<List<CategoryDto>> GetAllDtosAsync();
        Task<CategoryDto> CreateCategoryAsync(CategoryCreateDto dto);
        Task<List<CategoryDto>> CreateRangeCategoryAsync(List<CategoryCreateDto> dtos);
        Task<CategoryDto> UpdateCategoryAsync(CategoryUpdateDto dto);
        Task DeleteCategoryAsync(Guid id);
        Task DeleteRangeCategoryAsync(List<Guid> ids);
        Task<List<CategoryDto>> FilterAllAsync(string filter);
        Task<List<CategoryDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
