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
            try
            {
                var suppliers = await _supplierService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<SupplierDto>>.Success(200, suppliers));
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
                var supplierDto = await _supplierService.GetDto(id);
                return CreateActionResult(CustomResponseDto<SupplierDto>.Success(200, supplierDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(SupplierCreateDto createDto)
        {
            try
            {
                var added = await _supplierService.CreateSupplierAsync(createDto);
                return CreateActionResult(CustomResponseDto<SupplierDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeSuppliers(List<SupplierCreateDto> createDtos)
        {
            try
            {
                var added = await _supplierService.CreateRangeSupplierAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<SupplierDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(SupplierUpdateDto updateDto)
        {
            try
            {
                var dto = await _supplierService.UpdateSupplierAsync(updateDto);
                return CreateActionResult(CustomResponseDto<SupplierDto>.Success(200, dto));
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
                await _supplierService.DeleteSupplierAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeSuppliers(List<Guid> supplierIds)
        {
            try
            {
                await _supplierService.DeleteRangeSupplierAsync(supplierIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
