using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
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
            var deployedProducts = await _deployedProductService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<DeployedProduct>>.Success(200, deployedProducts.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var deployedProduct = await _deployedProductService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<DeployedProduct>.Success(200, deployedProduct));
        }

        [HttpPost]
        public async Task<IActionResult> Add(DeployedProductDto deployedProductDto)
        {
            // Create
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(DeployedProductDto deployedProductDto)
        {
            // Update
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
