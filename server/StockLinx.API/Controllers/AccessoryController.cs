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
            var accessories = await _accessoryService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<AccessoryDto>>.Success(200, accessories));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var accessoryDto = await _accessoryService.GetDto(id);
            return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, accessoryDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(AccessoryCreateDto createDto)
        {
            var added = await _accessoryService.CreateAccessoryAsync(createDto);
            return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeAccessories(List<AccessoryCreateDto> createDtos)
        {
            var added = await _accessoryService.CreateRangeAccessoryAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<AccessoryDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(AccessoryUpdateDto updateDto)
        {
            var dto = await _accessoryService.UpdateAccessoryAsync(updateDto);
            return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _accessoryService.DeleteAccessoryAsync(id);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeAccessories(List<Guid> accessoryIds)
        {
            await _accessoryService.DeleteRangeAccessoryAsync(accessoryIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckIn(AccessoryCheckInDto checkInDto)
        {
            var dto = await _accessoryService.CheckIn(checkInDto);
            return CreateActionResult(CustomResponseDto<AccessoryCheckInResponseDto>.Success(200, dto));
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOut(Guid id)
        {
            var dto = await _accessoryService.CheckOut(id);
            return CreateActionResult(CustomResponseDto<AccessoryDto>.Success(200, dto));
        }
    }
}
