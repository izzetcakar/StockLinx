﻿using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetProductController : CustomBaseController
    {
        private readonly IAssetProductService _assetProductService;

        public AssetProductController(IAssetProductService assetProductService)
        {
            _assetProductService = assetProductService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<AssetProductDto> result = await _assetProductService.GetAllDtosAsync();
                return CreateActionResult(
                    CustomResponseDto<List<AssetProductDto>>.Success(200, result)
                );
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
                AssetProductDto result = await _assetProductService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<AssetProductDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AssetProductCreateDto dto)
        {
            try
            {
                AssetProductDto result = await _assetProductService.CreateAssetProductAsync(dto);
                return CreateActionResult(CustomResponseDto<AssetProductDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<AssetProductCreateDto> dto)
        {
            try
            {
                List<AssetProductDto> result =
                    await _assetProductService.CreateRangeAssetProductAsync(dto);
                return CreateActionResult(
                    CustomResponseDto<List<AssetProductDto>>.Success(201, result)
                );
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
                await _assetProductService.DeleteAssetProductAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}