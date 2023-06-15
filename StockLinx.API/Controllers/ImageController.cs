using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;

        public ImageController(IMapper mapper, IImageService imageService)
        {
            _mapper = mapper;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var images = await _imageService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Image>>.Success(200, images.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var image = await _imageService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Image>.Success(200, image));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ImageDto imageDto)
        {
            // Create
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ImageDto imageDto)
        {
            // Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var image = await _imageService.GetByIdAsync(id);
            await _imageService.RemoveAsync(image);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
