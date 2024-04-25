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
    public class FieldSetController : CustomBaseController
    {
        private readonly IFieldSetService _fieldSetService;
        public FieldSetController(IFieldSetService fieldSetService)
        {
            _fieldSetService = fieldSetService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<FieldSetDto> result = await _fieldSetService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<FieldSetDto>>.Success(200, result));
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
                FieldSetDto result = await _fieldSetService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<FieldSetDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(FieldSetCreateDto dto)
        {
            try
            {
                await _fieldSetService.CreateFieldSetAsync(dto);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeFieldSets(List<FieldSetCreateDto> dtos)
        {
            try
            {
                await _fieldSetService.CreateRangeFieldSetAsync(dtos);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(FieldSetUpdateDto dto)
        {
            try
            {
                FieldSetDto result = await _fieldSetService.UpdateFieldSetAsync(dto);
                return CreateActionResult(CustomResponseDto<FieldSetDto>.Success(200, result));
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
                await _fieldSetService.DeleteFieldSetAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeFieldSets(List<Guid> ids)
        {
            try
            {
                await _fieldSetService.DeleteRangeFieldSetAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
