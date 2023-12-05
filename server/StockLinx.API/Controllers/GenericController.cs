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
        [HttpGet("entityCount")]
        public async Task<IActionResult> EntityCount()
        {
            var entityCounts = _service.GetEntityCounts();
            return CreateActionResult(CustomResponseDto<IEnumerable<EntityCounter>>.Success(200, entityCounts));
        }

        [HttpGet("productStatusCount")]
        public async Task<IActionResult> ProductStatusCount()
        {
            var productStatusCounts = _service.GetProductStatusCounts();
            return CreateActionResult(CustomResponseDto<IEnumerable<ProductStatusCounter>>.Success(200, productStatusCounts));
        }

        [HttpGet("productLocationCount")]
        public async Task<IActionResult> ProductLocationCount()
        {
            var productLocationCounts = _service.GetProductLocationCounts();
            return CreateActionResult(CustomResponseDto<IEnumerable<ProductLocationCounterDto>>.Success(200, productLocationCounts));
        }

        [HttpGet("productCategoryCount")]
        public async Task<IActionResult> ProductCategoryCount()
        {
            var productCategoryCounts = _service.GetProductCategoryCounts();
            return CreateActionResult(CustomResponseDto<IEnumerable<ProductCategoryCounterDto>>.Success(200, productCategoryCounts));
        }
    }
}
