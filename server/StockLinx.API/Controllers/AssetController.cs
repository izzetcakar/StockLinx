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
    public class AssetController : CustomBaseController
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var assets = await _assetService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<AssetDto>>.Success(200, assets));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var assetDto = await _assetService.GetDto(id);
            return CreateActionResult(CustomResponseDto<AssetDto>.Success(200, assetDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(AssetCreateDto createDto)
        {
            var added = await _assetService.CreateAssetAsync(createDto);
            return CreateActionResult(CustomResponseDto<List<AssetDto>>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeAssets(List<AssetCreateDto> createDtos)
        {
            var added = await _assetService.CreateRangeAssetAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<AssetDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(AssetUpdateDto updateDto)
        {
            var dto = await _assetService.UpdateAssetAsync(updateDto);
            return CreateActionResult(CustomResponseDto<AssetDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _assetService.DeleteAssetAsync(id);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeAssets(List<Guid> assetIds)
        {
            await _assetService.DeleteRangeAssetAsync(assetIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(AssetCheckInDto checkInDto)
        {
            var dto = await _assetService.CheckIn(checkInDto);
            return CreateActionResult(CustomResponseDto<AssetCheckInResponseDto>.Success(200, dto));
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOut(Guid id)
        {
            var dto = await _assetService.CheckOut(id);
            return CreateActionResult(CustomResponseDto<AssetDto>.Success(200, dto));
        }
    }
}
