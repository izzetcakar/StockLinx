using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.Entities;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        [HttpGet("{path}")]
        public async Task<IActionResult> Get(string path)
        {
            var base64Image = ImageHandler.GetBase64FromFilePath(path);
            var imageFile = System.IO.File.OpenRead(base64Image);
            return File(imageFile, "image/jpeg");
            return new ContentResult
            {
                Content = base64Image,
                ContentType = "text/plain",
                StatusCode = 200
            };
        }
    }

}
