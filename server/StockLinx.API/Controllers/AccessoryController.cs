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
    public class AccessoryController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IAccessoryService _accessoryService;
        public AccessoryController(IMapper mapper, IAccessoryService accessoryService)
        {
            _mapper = mapper;
            _accessoryService = accessoryService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var accessories = await _accessoryService.GetAccessoryDtos();
            return CreateActionResult(CustomResponseDto<List<AccessoryDto>>.Success(200, accessories));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var accessory = await _accessoryService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Accessory>.Success(200, accessory));
        }

        [HttpPost]
        public async Task<IActionResult> Add(AccessoryCreateDto createDto)
        {
            await _accessoryService.CreateAccessoryAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(AccessoryUpdateDto updateDto)
        {
            await _accessoryService.UpdateAccessoryAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var accessory = await _accessoryService.GetByIdAsync(id);
            await _accessoryService.RemoveAsync(accessory);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
