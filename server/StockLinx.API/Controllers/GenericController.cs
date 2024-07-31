using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GenericController : CustomBaseController
    {
        private readonly IGenericService _service;
        public GenericController(IGenericService service)
        {
            _service = service;
        }

        [HttpGet("createbaseentities")]
        public async Task<IActionResult> CreateBaseEntities()
        {
            await _service.CreateBaseEntities();
            return CreateActionResult(CustomResponseDto<string>.Success(200, "Base entities created successfully"));
        }

        [HttpDelete("clearbaseentities")]
        public async Task<IActionResult> ClearBaseEntities()
        {
            await _service.ClearBaseEntities();
            return CreateActionResult(CustomResponseDto<string>.Success(200, "Base entities deleted successfully"));
        }

        [HttpGet("entitycount")]
        public async Task<IActionResult> EntityCount()
        {
            try
            {
                var res = await _service.GetEntityCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<EntityCounter>>.Success(200, res));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("product/statuscount")]
        public async Task<IActionResult> ProductStatusCount()
        {
            try
            {
                var res = await _service.GetProductStatusCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<ProductStatusCounter>>.Success(200, res));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("product/companycount")]
        public async Task<IActionResult> ProductLocationCount()
        {
            try
            {
                var res = await _service.GetProductCompanyCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<ProductCompanyCounterDto>>.Success(200, res));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("product/categorycount")]
        public async Task<IActionResult> ProductCategoryCount()
        {
            try
            {
                var res = _service.GetProductCategoryCounts();
                return CreateActionResult(CustomResponseDto<IEnumerable<ProductCategoryCounterDto>>.Success(200, res));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
