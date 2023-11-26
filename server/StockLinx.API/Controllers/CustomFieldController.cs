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
    public class CustomFieldController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly ICustomFieldService _customFieldService;
        public CustomFieldController(IMapper mapper, ICustomFieldService customFieldService)
        {
            _customFieldService = customFieldService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var customFields = await _customFieldService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<CustomFieldDto>>.Success(200, customFields));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var customField = await _customFieldService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<CustomField>.Success(200, customField));
        }

        [HttpPost]
        public async Task<IActionResult> Add(CustomFieldCreateDto createDto)
        {
            await _customFieldService.CreateCustomFieldAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeCustomFields(List<CustomFieldCreateDto> createDtos)
        {
            await _customFieldService.CreateRangeCustomFieldAsync(createDtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(CustomFieldUpdateDto updateDto)
        {
            await _customFieldService.UpdateCustomFieldAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var customField = await _customFieldService.GetByIdAsync(id);
            await _customFieldService.RemoveAsync(customField);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeCustomFields(List<Guid> customFieldIds)
        {
            await _customFieldService.DeleteRangeCustomFieldAsync(customFieldIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
