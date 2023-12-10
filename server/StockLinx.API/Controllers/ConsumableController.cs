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
    public class ConsumableController : CustomBaseController
    {
        private readonly IConsumableService _consumableService;
        public ConsumableController(IConsumableService consumableService)
        {
            _consumableService = consumableService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var consumables = await _consumableService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(200, consumables));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var consumableDto = await _consumableService.GetDto(id);
            return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, consumableDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ConsumableCreateDto createDto)
        {
            var added = await _consumableService.CreateConsumableAsync(createDto);
            return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeConsumables(List<ConsumableCreateDto> createDtos)
        {
            var added = await _consumableService.CreateRangeConsumableAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ConsumableUpdateDto updateDto)
        {
            var dto = await _consumableService.UpdateConsumableAsync(updateDto);
            return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _consumableService.DeleteConsumableAsync(id);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeConsumables(List<Guid> consumableIds)
        {
            await _consumableService.DeleteRangeConsumableAsync(consumableIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInConsumable(ConsumableCheckInDto checkInDto)
        {
            var dto = await _consumableService.CheckIn(checkInDto);
            return CreateActionResult(CustomResponseDto<ConsumableCheckInResponseDto>.Success(200, dto));
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOutConsumable(Guid id)
        {
            var dto = await _consumableService.CheckOut(id);
            return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, dto));
        }
    }
}
