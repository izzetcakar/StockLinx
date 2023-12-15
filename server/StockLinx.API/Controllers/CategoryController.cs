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
            try
            {
                var categories = await _categoryService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<CategoryDto>>.Success(200, categories));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                var categoryDto = await _categoryService.GetDto(id);
                return CreateActionResult(CustomResponseDto<CategoryDto>.Success(201, categoryDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(CategoryCreateDto createDto)
        {
            try
            {
                var added = await _categoryService.CreateCategoryAsync(createDto);
                return CreateActionResult(CustomResponseDto<CategoryDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<CategoryCreateDto> createDtos)
        {
            try
            {
                var added = await _categoryService.CreateRangeCategoryAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<CategoryDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(CategoryUpdateDto updateDto)
        {
            try
            {
                var dto = await _categoryService.UpdateCategoryAsync(updateDto);
                return CreateActionResult(CustomResponseDto<CategoryDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _categoryService.DeleteCategoryAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRange(List<Guid> categoryIds)
        {
            try
            {
                await _categoryService.DeleteRangeCategoryAsync(categoryIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
