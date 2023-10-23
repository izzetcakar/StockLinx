using AutoMapper;
using Microsoft.AspNetCore.Http;
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
    public class ComponentController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IComponentService _componentService;
        public ComponentController(IMapper mapper, IComponentService componentService)
        {
            _mapper = mapper;
            _componentService = componentService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var components = await _componentService.GetComponentDtos();
            return CreateActionResult(CustomResponseDto<List<ComponentDto>>.Success(200, components));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var component = await _componentService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Component>.Success(200, component));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ComponentCreateDto createDto)
        {
            await _componentService.CreateComponentAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ComponentUpdateDto updateDto)
        {
            await _componentService.UpdateComponentAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var component = await _componentService.GetByIdAsync(id);
            await _componentService.RemoveAsync(component);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
