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
    public class ProductStatusController : CustomBaseController
    {
        private readonly IProductStatusService _productStatusService;
        public ProductStatusController(IProductStatusService productStatusService)
        {
            _productStatusService = productStatusService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var productStatuses = await _productStatusService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<ProductStatusDto>>.Success(200, productStatuses));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var productStatusDto = await _productStatusService.GetDto(id);
            return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, productStatusDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductStatusCreateDto createDto)
        {
            var added = await _productStatusService.CreateProductStatusAsync(createDto);
            return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeProductStatuses(List<ProductStatusCreateDto> createDtos)
        {
            var added = await _productStatusService.CreateRangeProductStatusAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<ProductStatusDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ProductStatusUpdateDto updateDto)
        {
            var dto = await _productStatusService.UpdateProductStatusAsync(updateDto);
            return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var productStatus = await _productStatusService.GetByIdAsync(id);
            await _productStatusService.RemoveAsync(productStatus);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeProductStatuses(List<Guid> productStatusIds)
        {
            await _productStatusService.DeleteRangeProductStatusAsync(productStatusIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
