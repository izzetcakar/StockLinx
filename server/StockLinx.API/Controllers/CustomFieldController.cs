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
    public class CustomFieldController : CustomBaseController
    {
        private readonly ICustomFieldService _customFieldService;
        public CustomFieldController(ICustomFieldService customFieldService)
        {
            _customFieldService = customFieldService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<CustomFieldDto> result = await _customFieldService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<CustomFieldDto>>.Success(200, result));
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
                CustomFieldDto result = await _customFieldService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<CustomFieldDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(CustomFieldCreateDto dto)
        {
            try
            {
                await _customFieldService.CreateCustomFieldAsync(dto);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeCustomFields(List<CustomFieldCreateDto> dtos)
        {
            try
            {
                await _customFieldService.CreateRangeCustomFieldAsync(dtos);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(CustomFieldUpdateDto dto)
        {
            try
            {
                CustomFieldDto result = await _customFieldService.UpdateCustomFieldAsync(dto);
                return CreateActionResult(CustomResponseDto<CustomFieldDto>.Success(200, result));
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
                await _customFieldService.DeleteCustomFieldAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeCustomFields(List<Guid> ids)
        {
            try
            {
                await _customFieldService.DeleteRangeCustomFieldAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
