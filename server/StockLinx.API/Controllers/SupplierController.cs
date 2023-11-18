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
            var suppliers = await _supplierService.GetSupplierDtos();
            return CreateActionResult(CustomResponseDto<List<SupplierDto>>.Success(200, suppliers));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var supplier = await _supplierService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Supplier>.Success(200, supplier));
        }

        [HttpPost]
        public async Task<IActionResult> Add(SupplierCreateDto createDto)
        {
            await _supplierService.CreateSupplierAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeSuppliers(List<SupplierCreateDto> createDtos)
        {
            await _supplierService.CreateRangeSupplierAsync(createDtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(SupplierUpdateDto updateDto)
        {
            await _supplierService.UpdateSupplierAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var supplier = await _supplierService.GetByIdAsync(id);
            await _supplierService.RemoveAsync(supplier);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeSuppliers(List<Guid> supplierIds)
        {
            await _supplierService.DeleteRangeSupplierAsync(supplierIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
