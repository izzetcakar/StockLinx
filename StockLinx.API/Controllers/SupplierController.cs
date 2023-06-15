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

    public class SupplierController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly ISupplierService _supplierService;

        public SupplierController(IMapper mapper, ISupplierService supplierService)
        {
            _mapper = mapper;
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var suppliers = await _supplierService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Supplier>>.Success(200, suppliers.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var supplier = await _supplierService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Supplier>.Success(200, supplier));
        }

        [HttpPost]
        public async Task<IActionResult> Add(SupplierDto supplierDto)
        {
            // Create
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(SupplierDto supplierDto)
        {
            // Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var supplier = await _supplierService.GetByIdAsync(id);
            await _supplierService.RemoveAsync(supplier);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
