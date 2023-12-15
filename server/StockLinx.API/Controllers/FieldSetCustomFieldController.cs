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
                var fieldSetCustomFields = await _fieldSetCustomFieldService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<FieldSetCustomFieldDto>>.Success(200, fieldSetCustomFields));
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
                var fieldSetCustomFieldDto = await _fieldSetCustomFieldService.GetDto(id);
                return CreateActionResult(CustomResponseDto<FieldSetCustomFieldDto>.Success(200, fieldSetCustomFieldDto));
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
                var added = await _fieldSetCustomFieldService.CreateFieldSetCustomFieldAsync(dto);
                return CreateActionResult(CustomResponseDto<FieldSetCustomFieldDto>.Success(201, added));
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
                var added = await _fieldSetCustomFieldService.CreateRangeFieldSetCustomFieldAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<FieldSetCustomFieldDto>>.Success(201, added));
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
