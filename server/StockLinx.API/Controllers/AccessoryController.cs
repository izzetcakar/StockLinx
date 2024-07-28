using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
        private readonly IAccessoryService _accessoryService;

        public AccessoryController(IAccessoryService accessoryService)
        {
            _accessoryService = accessoryService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<AccessoryDto> result = await _accessoryService.GetAllDtosAsync();

                return CreateActionResult(
                    CustomResponseDto<List<AccessoryDto>>.Success(200, result)
                );
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
                AccessoryDto dto = await _accessoryService.GetDtoAsync(id);

                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AccessoryCreateDto dto)
        {
            try
            {
                AccessoryDto result = await _accessoryService.CreateAccessoryAsync(dto);

                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeAccessories(List<AccessoryCreateDto> dtos)
        {
            try
            {
                List<AccessoryDto> result = await _accessoryService.CreateRangeAccessoryAsync(dtos);
                return CreateActionResult(
                    CustomResponseDto<List<AccessoryDto>>.Success(201, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(AccessoryUpdateDto dto)
        {
            try
            {
                AccessoryDto result = await _accessoryService.UpdateAccessoryAsync(dto);
                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, result));
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
                await _accessoryService.DeleteAccessoryAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeAccessories(List<Guid> ids)
        {
            try
            {
                await _accessoryService.DeleteRangeAccessoryAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(EmployeeProductCheckInDto dto)
        {
            try
            {
                EmployeeProductDto result = await _accessoryService.CheckInAsync(dto);
                return CreateActionResult(CustomResponseDto<EmployeeProductDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOut(EmployeeProductCheckOutDto dto)
        {
            try
            {
                List<EmployeeProductDto> result = await _accessoryService.CheckOutAsync(dto);
                return CreateActionResult(CustomResponseDto<List<EmployeeProductDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter([FromQuery] string? filter)
        {
            try
            {
                if (string.IsNullOrEmpty(filter))
                {
                    return await All();
                }
                List<AccessoryDto> result = await _accessoryService.FilterAllAsync(filter);
                return CreateActionResult(
                    CustomResponseDto<List<AccessoryDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("display")]
        public async Task<IActionResult> Display(List<Guid> ids)
        {
            try
            {
                List<AccessoryDisplayDto> result = await _accessoryService.GetDisplayDtos(ids);

                return CreateActionResult(
                    CustomResponseDto<List<AccessoryDisplayDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
