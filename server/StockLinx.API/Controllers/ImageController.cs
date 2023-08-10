using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : CustomBaseController
    {
        [HttpGet("{path}")]
        public async Task<IActionResult> Get(string path)
        {
            var base64Image = ImageHandler.GetBase64FromFile(path);
            return CreateActionResult(CustomResponseDto<string>.Success(200, base64Image));
        }
    }
}
