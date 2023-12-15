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
            try
            {
                var consumables = await _consumableService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(200, consumables));
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
                var consumableDto = await _consumableService.GetDto(id);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, consumableDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ConsumableCreateDto createDto)
        {
            try
            {
                var added = await _consumableService.CreateConsumableAsync(createDto);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeConsumables(List<ConsumableCreateDto> createDtos)
        {
            try
            {
                var added = await _consumableService.CreateRangeConsumableAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ConsumableUpdateDto updateDto)
        {
            try
            {
                var dto = await _consumableService.UpdateConsumableAsync(updateDto);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, dto));
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
                await _consumableService.DeleteConsumableAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeConsumables(List<Guid> consumableIds)
        {
            try
            {
                await _consumableService.DeleteRangeConsumableAsync(consumableIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInConsumable(ConsumableCheckInDto checkInDto)
        {
            try
            {
                var dto = await _consumableService.CheckIn(checkInDto);
                return CreateActionResult(CustomResponseDto<ConsumableCheckInResponseDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOutConsumable(Guid id)
        {
            try
            {
                var dto = await _consumableService.CheckOut(id);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
