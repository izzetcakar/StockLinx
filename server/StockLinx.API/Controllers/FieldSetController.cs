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
            var fieldSets = await _fieldSetService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<FieldSetDto>>.Success(200, fieldSets));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var fieldSetDto = await _fieldSetService.GetDto(id);
            return CreateActionResult(CustomResponseDto<FieldSetDto>.Success(200, fieldSetDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(FieldSetCreateDto createDto)
        {
            await _fieldSetService.CreateFieldSetAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeFieldSets(List<FieldSetCreateDto> createDtos)
        {
            await _fieldSetService.CreateRangeFieldSetAsync(createDtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(FieldSetUpdateDto updateDto)
        {
            await _fieldSetService.UpdateFieldSetAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var fieldSet = await _fieldSetService.GetByIdAsync(id);
            await _fieldSetService.RemoveAsync(fieldSet);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeFieldSets(List<Guid> fieldSetIds)
        {
            await _fieldSetService.DeleteRangeFieldSetAsync(fieldSetIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
