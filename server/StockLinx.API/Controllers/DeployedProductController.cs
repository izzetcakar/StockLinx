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
                List<DeployedProductDto> result = await _deployedProductService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<DeployedProductDto>>.Success(200, result));
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
                DeployedProductDto result = await _deployedProductService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(DeployedProductCreateDto dto)
        {
            try
            {
                DeployedProductDto result = await _deployedProductService.CreateDeployedProductAsync(dto);
                return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<DeployedProductCreateDto> dto)
        {
            try
            {
                List<DeployedProductDto> result = await _deployedProductService.CreateRangeDeployedProductAsync(dto);
                return CreateActionResult(CustomResponseDto<List<DeployedProductDto>>.Success(201, result));
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
