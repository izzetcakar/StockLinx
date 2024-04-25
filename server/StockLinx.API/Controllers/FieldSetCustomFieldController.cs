using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldSetCustomFieldController : CustomBaseController
    {
        private readonly IFieldSetCustomFieldService _fieldSetCustomFieldService;
        public FieldSetCustomFieldController(IFieldSetCustomFieldService fieldSetCustomFieldService)
        {
            _fieldSetCustomFieldService = fieldSetCustomFieldService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<FieldSetCustomFieldDto> result = await _fieldSetCustomFieldService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<FieldSetCustomFieldDto>>.Success(200, result));
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
                FieldSetCustomFieldDto result = await _fieldSetCustomFieldService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<FieldSetCustomFieldDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(FieldSetCustomFieldDto dto)
        {
            try
            {
                FieldSetCustomFieldDto result = await _fieldSetCustomFieldService.CreateFieldSetCustomFieldAsync(dto);
                return CreateActionResult(CustomResponseDto<FieldSetCustomFieldDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeFieldSetCustomFields(List<FieldSetCustomFieldDto> dtos)
        {
            try
            {
                List<FieldSetCustomFieldDto> result = await _fieldSetCustomFieldService.CreateRangeFieldSetCustomFieldAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<FieldSetCustomFieldDto>>.Success(201, result));
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
                await _fieldSetCustomFieldService.DeleteFieldSetCustomFieldAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeFieldSetCustomFields(List<Guid> ids)
        {
            try
            {
                await _fieldSetCustomFieldService.DeleteRangeFieldSetCustomFieldAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("synchronize")]
        public async Task<IActionResult> SynchronizeFieldSetCustomFields(List<FieldSetCustomFieldDto> dtos)
        {
            try
            {
                await _fieldSetCustomFieldService.SynchronizeFieldSetCustomFieldsAsync(dtos);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
