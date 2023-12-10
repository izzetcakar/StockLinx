using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Others;
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
            var logs = _customLogService.GetAllAsync().Result.ToList();
            try
            {
                var logList = new List<object>();
                foreach (var log in logs)
                {
                    var entity = _customLogService.GetObjById(log.ItemController, log.ItemId);
                    logList.Add(entity);
                }
                return CreateActionResult(CustomResponseDto<List<object>>.Success(200, logList));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
