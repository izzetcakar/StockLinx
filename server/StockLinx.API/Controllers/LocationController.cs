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
    public class LocationController : CustomBaseController
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var locationDtos = await _locationService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<LocationDto>>.Success(200, locationDtos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var locationDto = await _locationService.GetDto(id);
            return CreateActionResult(CustomResponseDto<LocationDto>.Success(200, locationDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(LocationCreateDto createDto)
        {
            var added = await _locationService.CreateLocationAsync(createDto);
            return CreateActionResult(CustomResponseDto<LocationDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeLocations(List<LocationCreateDto> createDtos)
        {
            var added = await _locationService.CreateRangeLocationAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<LocationDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(LocationUpdateDto updateDto)
        {
            await _locationService.UpdateLocationAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var location = await _locationService.GetByIdAsync(id);
            await _locationService.RemoveAsync(location);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeLocations(List<Guid> locationIds)
        {
            await _locationService.DeleteRangeLocationAsync(locationIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
