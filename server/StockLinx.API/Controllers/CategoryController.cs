using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : CustomBaseController
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var categories = await _categoryService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<CategoryDto>>.Success(200, categories));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var categoryDto = await _categoryService.GetDto(id);
            return CreateActionResult(CustomResponseDto<CategoryDto>.Success(201, categoryDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(CategoryCreateDto createDto)
        {
            var added = await _categoryService.CreateCategoryAsync(createDto);
            return CreateActionResult(CustomResponseDto<CategoryDto>.Success(201, added));
        }
        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<CategoryCreateDto> createDtos)
        {
            var added = await _categoryService.CreateRangeCategoryAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<CategoryDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(CategoryUpdateDto updateDto)
        {
            var dto = await _categoryService.UpdateCategoryAsync(updateDto);
            return CreateActionResult(CustomResponseDto<CategoryDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            await _categoryService.RemoveAsync(category);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRange(List<Guid> categoryIds)
        {
            await _categoryService.DeleteRangeCategoryAsync(categoryIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
