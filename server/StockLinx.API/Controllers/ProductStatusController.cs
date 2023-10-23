using AutoMapper;
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
    public class ProductStatusController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IProductStatusService _productStatusService;
        public ProductStatusController(IMapper mapper, IProductStatusService productStatusService)
        {
            _mapper = mapper;
            _productStatusService = productStatusService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var productStatuses = await _productStatusService.GetProductStatusDtos();
            return CreateActionResult(CustomResponseDto<List<ProductStatusDto>>.Success(200, productStatuses));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var productStatus = await _productStatusService.GetByIdAsync(id);
            var productStatusDto = _mapper.Map<ProductStatusDto>(productStatus);
            return CreateActionResult(CustomResponseDto<ProductStatusDto>.Success(200, productStatusDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ProductStatusCreateDto createDto)
        {
            await _productStatusService.CreateProductStatusAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ProductStatusUpdateDto updateDto)
        {
            await _productStatusService.UpdateProductStatusAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var productStatus = await _productStatusService.GetByIdAsync(id);
            await _productStatusService.RemoveAsync(productStatus);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
