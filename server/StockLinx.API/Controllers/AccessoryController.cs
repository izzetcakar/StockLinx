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
                var accessories = await _accessoryService.GetAllDtos();

                return CreateActionResult(CustomResponseDto<List<AccessoryDto>>.Success(200, accessories));
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
                var accessoryDto = await _accessoryService.GetDto(id);

                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, accessoryDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(AccessoryCreateDto createDto)
        {
            try
            {
                var added = await _accessoryService.CreateAccessoryAsync(createDto);

                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeAccessories(List<AccessoryCreateDto> createDtos)
        {
            try
            {
                var added = await _accessoryService.CreateRangeAccessoryAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<AccessoryDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(AccessoryUpdateDto updateDto)
        {
            try
            {
                var dto = await _accessoryService.UpdateAccessoryAsync(updateDto);
                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, dto));
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
        public async Task<IActionResult> DeleteRangeAccessories(List<Guid> accessoryIds)
        {
            try
            {
                await _accessoryService.DeleteRangeAccessoryAsync(accessoryIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(AccessoryCheckInDto checkInDto)
        {
            try
            {
                var dto = await _accessoryService.CheckIn(checkInDto);
                return CreateActionResult(CustomResponseDto<AccessoryCheckInResponseDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOut(Guid id)
        {
            try
            {
                var dto = await _accessoryService.CheckOut(id);
                return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
