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
    public class ManufacturerController : CustomBaseController
    {
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var manufacturers = await _manufacturerService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(200, manufacturers));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var manufacturerDto = await _manufacturerService.GetDto(id);
            return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(200, manufacturerDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ManufacturerCreateDto createDto)
        {
            var added = await _manufacturerService.CreateManufacturerAsync(createDto);
            return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeManufacturers(List<ManufacturerCreateDto> createDtos)
        {
            var added = await _manufacturerService.CreateRangeManufacturerAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ManufacturerUpdateDto updateDto)
        {
            var dto = await _manufacturerService.UpdateManufacturerAsync(updateDto);
            return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _manufacturerService.DeleteManufacturerAsync(id);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeManufacturers(List<Guid> manufacturerIds)
        {
            await _manufacturerService.DeleteRangeManufacturerAsync(manufacturerIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
