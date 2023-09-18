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
    public class ConsumableController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IConsumableService _consumableService;
        public ConsumableController(IMapper mapper, IConsumableService consumableService)
        {
            _mapper = mapper;
            _consumableService = consumableService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var consumables = await _consumableService.GetAllAsync();
            var consumableDtos = _mapper.Map<List<ConsumableDto>>(consumables).ToList();
            return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(200, consumableDtos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var consumable = await _consumableService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Consumable>.Success(200, consumable));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ConsumableCreateDto createDto)
        {
            await _consumableService.CreateConsumableAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ConsumableUpdateDto updateDto)
        {
            await _consumableService.UpdateConsumableAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var consumable = await _consumableService.GetByIdAsync(id);
            await _consumableService.RemoveAsync(consumable);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
