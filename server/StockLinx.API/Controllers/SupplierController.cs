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

    public class SupplierController : CustomBaseController
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var suppliers = await _supplierService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<SupplierDto>>.Success(200, suppliers));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var supplierDto = await _supplierService.GetDto(id);
            return CreateActionResult(CustomResponseDto<SupplierDto>.Success(200, supplierDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(SupplierCreateDto createDto)
        {
            var added = await _supplierService.CreateSupplierAsync(createDto);
            return CreateActionResult(CustomResponseDto<SupplierDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeSuppliers(List<SupplierCreateDto> createDtos)
        {
            var added = await _supplierService.CreateRangeSupplierAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<SupplierDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(SupplierUpdateDto updateDto)
        {
            var dto = await _supplierService.UpdateSupplierAsync(updateDto);
            return CreateActionResult(CustomResponseDto<SupplierDto>.Success(200, dto));
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
