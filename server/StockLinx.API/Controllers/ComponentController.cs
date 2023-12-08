﻿using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentController : CustomBaseController
    {
        private readonly IComponentService _componentService;
        public ComponentController(IComponentService componentService)
        {
            _componentService = componentService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var components = await _componentService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<ComponentDto>>.Success(200, components));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var componentDto = await _componentService.GetDto(id);
            return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, componentDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ComponentCreateDto createDto)
        {
            var added = await _componentService.CreateComponentAsync(createDto);
            return CreateActionResult(CustomResponseDto<ComponentDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeComponents(List<ComponentCreateDto> createDtos)
        {
            var added = await _componentService.CreateRangeComponentAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<ComponentDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ComponentUpdateDto updateDto)
        {
            var dto = await _componentService.UpdateComponentAsync(updateDto);
            return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var component = await _componentService.GetByIdAsync(id);
            await _componentService.RemoveAsync(component);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeComponents(List<Guid> componentIds)
        {
            await _componentService.DeleteRangeComponentAsync(componentIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
