using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Authorize]
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
                List<ProductStatusDto> result = await _productStatusService.GetAllDtosAsync();
                return CreateActionResult(
                    CustomResponseDto<List<ProductStatusDto>>.Success(200, result)
                );
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
                ProductStatusDto result = await _productStatusService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductStatusCreateDto dto)
        {
            try
            {
                ProductStatusDto result = await _productStatusService.CreateProductStatusAsync(dto);
                return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeProductStatuss(List<ProductStatusCreateDto> dtos)
        {
            try
            {
                List<ProductStatusDto> result =
                    await _productStatusService.CreateRangeProductStatusAsync(dtos);
                return CreateActionResult(
                    CustomResponseDto<List<ProductStatusDto>>.Success(201, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ProductStatusUpdateDto dto)
        {
            try
            {
                ProductStatusDto result = await _productStatusService.UpdateProductStatusAsync(dto);
                return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, result));
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
        public async Task<IActionResult> DeleteRangeProductStatuss(List<Guid> ids)
        {
            try
            {
                await _productStatusService.DeleteRangeProductStatusAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter([FromQuery] string? filter)
        {
            try
            {
                if (string.IsNullOrEmpty(filter))
                {
                    return await All();
                }
                List<ProductStatusDto> result = await _productStatusService.FilterAllAsync(filter);
                return CreateActionResult(
                    CustomResponseDto<List<ProductStatusDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("display")]
        public async Task<IActionResult> Display(List<Guid> ids)
        {
            try
            {
                List<ProductStatusDisplayDto> result = await _productStatusService.GetDisplayDtos(ids);

                return CreateActionResult(
                    CustomResponseDto<List<ProductStatusDisplayDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
