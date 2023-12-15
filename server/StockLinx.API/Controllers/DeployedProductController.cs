using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeployedProductController : CustomBaseController
    {
        private readonly IDeployedProductService _deployedProductService;

        public DeployedProductController(IDeployedProductService deployedProductService)
        {
            _deployedProductService = deployedProductService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                var deployedProducts = await _deployedProductService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<DeployedProductDto>>.Success(200, deployedProducts));
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
                var deployedProductDto = await _deployedProductService.GetDto(id);
                return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(200, deployedProductDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(DeployedProductCreateDto createDto)
        {
            try
            {
                var added = await _deployedProductService.CreateDeployedProductAsync(createDto);
                return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<DeployedProductCreateDto> createRangeDto)
        {
            try
            {
                var added = await _deployedProductService.CreateRangeDeployedProductAsync(createRangeDto);
                return CreateActionResult(CustomResponseDto<List<DeployedProductDto>>.Success(201, added));
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
                await _deployedProductService.DeleteDeployedProductAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
