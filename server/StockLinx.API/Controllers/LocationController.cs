using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly ILocationService _locationService;

        public LocationController(IMapper mapper, ILocationService locationService)
        {
            _mapper = mapper;
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var locations = await _locationService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Location>>.Success(200, locations.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var location = await _locationService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Location>.Success(200, location));
        }

        [HttpPost]
        public async Task<IActionResult> Add(LocationCreateDto createDto)
        {
            await _locationService.CreateLocationAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(LocationDto locationDto)
        {
            // Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var location = await _locationService.GetByIdAsync(id);
            await _locationService.RemoveAsync(location);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
