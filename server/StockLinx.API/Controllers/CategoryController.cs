using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        public CategoryController(IMapper mapper, ICategoryService categoryService)
        {
            _mapper = mapper;
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var categories = await _categoryService.GetCategoryDtos();
            return CreateActionResult(CustomResponseDto<List<CategoryDto>>.Success(200, categories));
        }

        [HttpGet("counts")]
        public async Task<IActionResult> CategoryCount()
        {
            var categoryCounts = await _categoryService.GetCounts();
            return CreateActionResult(CustomResponseDto<List<ProductCategoryCounterDto>>.Success(200, categoryCounts));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Category>.Success(200, category));
        }

        [HttpPost]
        public async Task<IActionResult> Add(CategoryCreateDto createDto)
        {
            await _categoryService.CreateCategoryAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(CategoryUpdateDto updateDto)
        {
            await _categoryService.UpdateCategoryAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            await _categoryService.RemoveAsync(category);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
