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
                var fieldSets = await _fieldSetService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<FieldSetDto>>.Success(200, fieldSets));
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
                var fieldSetDto = await _fieldSetService.GetDto(id);
                return CreateActionResult(CustomResponseDto<FieldSetDto>.Success(200, fieldSetDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(FieldSetCreateDto createDto)
        {
            try
            {
                await _fieldSetService.CreateFieldSetAsync(createDto);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeFieldSets(List<FieldSetCreateDto> createDtos)
        {
            try
            {
                await _fieldSetService.CreateRangeFieldSetAsync(createDtos);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(FieldSetUpdateDto updateDto)
        {
            try
            {
                var dto = await _fieldSetService.UpdateFieldSetAsync(updateDto);
                return CreateActionResult(CustomResponseDto<FieldSetDto>.Success(200, dto));
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
        public async Task<IActionResult> DeleteRangeFieldSets(List<Guid> fieldSetIds)
        {
            try
            {
                await _fieldSetService.DeleteRangeFieldSetAsync(fieldSetIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
