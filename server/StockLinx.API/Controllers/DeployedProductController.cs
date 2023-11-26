using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeployedProductController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IDeployedProductService _deployedProductService;

        public DeployedProductController(IMapper mapper, IDeployedProductService deployedProductService)
        {
            _mapper = mapper;
            _deployedProductService = deployedProductService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var deployedProducts = await _deployedProductService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<DeployedProductDto>>.Success(200, deployedProducts));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var deployedProduct = await _deployedProductService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<DeployedProduct>.Success(200, deployedProduct));
        }

        [HttpPost]
        public async Task<IActionResult> Add(DeployedProductCreateDto createDto)
        {
            var added = await _deployedProductService.CreateDeployedProductAsync(createDto);
            return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<DeployedProductCreateDto> createRangeDto)
        {
            var added = await _deployedProductService.CreateRangeDeployedProductAsync(createRangeDto);
            return CreateActionResult(CustomResponseDto<List<DeployedProductDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(DeployedProductUpdateDto updateDto)
        {
            await _deployedProductService.UpdateDeployedProductAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deployedProduct = await _deployedProductService.GetByIdAsync(id);
            await _deployedProductService.RemoveAsync(deployedProduct);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
