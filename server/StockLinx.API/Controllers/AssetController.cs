using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IAssetService _assetService;
        public AssetController(IMapper mapper, IAssetService assetService)
        {
            _mapper = mapper;
            _assetService = assetService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var assets = await _assetService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Asset>>.Success(200, assets.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var asset = await _assetService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Asset>.Success(200, asset));
        }

        [HttpPost]
        public async Task<IActionResult> Add(AssetCreateDto createDto)
        {
            await _assetService.CreateAssetAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(AssetDto assetDto)
        {
            //Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var asset = await _assetService.GetByIdAsync(id);
            await _assetService.RemoveAsync(asset);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
