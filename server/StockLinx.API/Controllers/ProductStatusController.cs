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
            try
            {
                var productStatuses = await _productStatusService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<ProductStatusDto>>.Success(200, productStatuses));
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
                var productStatusDto = await _productStatusService.GetDto(id);
                return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, productStatusDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductStatusCreateDto createDto)
        {
            try
            {
                var added = await _productStatusService.CreateProductStatusAsync(createDto);
                return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeProductStatuses(List<ProductStatusCreateDto> createDtos)
        {
            try
            {
                var added = await _productStatusService.CreateRangeProductStatusAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<ProductStatusDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ProductStatusUpdateDto updateDto)
        {
            try
            {
                var dto = await _productStatusService.UpdateProductStatusAsync(updateDto);
                return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, dto));
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
                await _productStatusService.DeleteProductStatusAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeProductStatuses(List<Guid> productStatusIds)
        {
            try
            {
                await _productStatusService.DeleteRangeProductStatusAsync(productStatusIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
