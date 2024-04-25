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
            try
            {
                List<AssetDto> result = await _assetService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<AssetDto>>.Success(200, result));
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
                AssetDto result = await _assetService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<AssetDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AssetCreateDto dto)
        {
            try
            {
                List<AssetDto> result = await _assetService.CreateAssetAsync(dto);
                return CreateActionResult(CustomResponseDto<List<AssetDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeAssets(List<AssetCreateDto> dto)
        {
            try
            {
                List<AssetDto> result = await _assetService.CreateRangeAssetAsync(dto);
                return CreateActionResult(CustomResponseDto<List<AssetDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(AssetUpdateDto dto)
        {
            try
            {
                AssetDto result = await _assetService.UpdateAssetAsync(dto);
                return CreateActionResult(CustomResponseDto<AssetDto>.Success(200, result));
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
                await _assetService.DeleteAssetAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeAssets(List<Guid> ids)
        {
            try
            {
                await _assetService.DeleteRangeAssetAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(ProductCheckInDto dto)
        {
            try
            {
                DeployedProductDto result = await _assetService.CheckInAsync(dto);
                return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOut(Guid id)
        {
            try
            {
                await _assetService.CheckOutAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
