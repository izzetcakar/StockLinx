using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController : CustomBaseController
    {
        private readonly IGenericService _service;
        public GenericController(IGenericService service)
        {
            _service = service;
        }

        [HttpGet("createBaseEntities")]
        public async Task<IActionResult> CreateBaseEntities()
        {
            await _service.CreateBaseEntities();
            return CreateActionResult(CustomResponseDto<string>.Success(200, "Base entities created successfully"));
        }

        [HttpDelete("clearBaseEntities")]
        public async Task<IActionResult> ClearBaseEntities()
        {
            await _service.ClearBaseEntities();
            return CreateActionResult(CustomResponseDto<string>.Success(200, "Base entities deleted successfully"));
        }

        [HttpGet("entityCount")]
        public async Task<IActionResult> EntityCount()
        {
            try
            {
                var entityCounts = _service.GetEntityCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<EntityCounter>>.Success(200, entityCounts));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("productStatusCount")]
        public async Task<IActionResult> ProductStatusCount()
        {
            try
            {
                var productStatusCounts = _service.GetProductStatusCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<ProductStatusCounter>>.Success(200, productStatusCounts));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("productLocationCount")]
        public async Task<IActionResult> ProductLocationCount()
        {
            try
            {
                var productLocationCounts = _service.GetProductLocationCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<ProductLocationCounterDto>>.Success(200, productLocationCounts));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("productCategoryCount")]
        public async Task<IActionResult> ProductCategoryCount()
        {
            try
            {
                var productCategoryCounts = _service.GetProductCategoryCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<ProductCategoryCounterDto>>.Success(200, productCategoryCounts));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
