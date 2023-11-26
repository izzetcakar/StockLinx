using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldSetCustomFieldController : CustomBaseController
    {
        private readonly IFieldSetCustomFieldService _fieldSetCustomFieldService;
        private readonly IMapper _mapper;
        public FieldSetCustomFieldController(IMapper mapper, IFieldSetCustomFieldService fieldSetCustomFieldService)
        {
            _fieldSetCustomFieldService = fieldSetCustomFieldService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var fieldSetCustomFields = await _fieldSetCustomFieldService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<FieldSetCustomFieldDto>>.Success(200, fieldSetCustomFields));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var fieldSetCustomField = await _fieldSetCustomFieldService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<FieldSetCustomField>.Success(200, fieldSetCustomField));
        }

        [HttpPost]
        public async Task<IActionResult> Add(FieldSetCustomFieldDto dto)
        {
            var added = await _fieldSetCustomFieldService.CreateFieldSetCustomFieldAsync(dto);
            return CreateActionResult(CustomResponseDto<FieldSetCustomFieldDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeFieldSetCustomFields(List<FieldSetCustomFieldDto> dtos)
        {
            var added = await _fieldSetCustomFieldService.CreateRangeFieldSetCustomFieldAsync(dtos);
            return CreateActionResult(CustomResponseDto<List<FieldSetCustomFieldDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(FieldSetCustomFieldDto dto)
        {
            await _fieldSetCustomFieldService.UpdateFieldSetCustomFieldAsync(dto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var fieldSetCustomField = await _fieldSetCustomFieldService.GetByIdAsync(id);
            await _fieldSetCustomFieldService.RemoveAsync(fieldSetCustomField);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeFieldSetCustomFields(List<Guid> ids)
        {
            await _fieldSetCustomFieldService.DeleteRangeFieldSetCustomFieldAsync(ids);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpPost("synchronize")]
        public async Task<IActionResult> SynchronizeFieldSetCustomFields(List<FieldSetCustomFieldDto> dtos)
        {
            await _fieldSetCustomFieldService.SynchronizeFieldSetCustomFieldsAsync(dtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
