using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomLogController : CustomBaseController
    {
        private readonly ICustomLogService _customLogService;
        public CustomLogController(ICustomLogService customLogService)
        {
            _customLogService = customLogService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                var logList = await _customLogService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<IEnumerable<CustomLog>>.Success(200, logList));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
