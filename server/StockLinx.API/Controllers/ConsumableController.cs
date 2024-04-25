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
                List<ConsumableDto> result = await _consumableService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(200, result));
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
                ConsumableDto result = await _consumableService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ConsumableCreateDto dto)
        {
            try
            {
                ConsumableDto result = await _consumableService.CreateConsumableAsync(dto);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeConsumables(List<ConsumableCreateDto> dtos)
        {
            try
            {
                List<ConsumableDto> result = await _consumableService.CreateRangeConsumableAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<ConsumableDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ConsumableUpdateDto dto)
        {
            try
            {
                ConsumableDto result = await _consumableService.UpdateConsumableAsync(dto);
                return CreateActionResult(CustomResponseDto<ConsumableDto>.Success(200, result));
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
        public async Task<IActionResult> DeleteRangeConsumables(List<Guid> ids)
        {
            try
            {
                await _consumableService.DeleteRangeConsumableAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInConsumable(ProductCheckInDto dto)
        {
            try
            {
                DeployedProductDto result = await _consumableService.CheckInAsync(dto);
                return CreateActionResult(CustomResponseDto<DeployedProductDto>.Success(200, result));
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
                await _consumableService.CheckOutAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
