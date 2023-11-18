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
    public class ManufacturerController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IMapper mapper, IManufacturerService manufacturerService)
        {
            _mapper = mapper;
            _manufacturerService = manufacturerService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var manufacturers = await _manufacturerService.GetManufacturerDtos();
            return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(200, manufacturers));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var manufacturer = await _manufacturerService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Manufacturer>.Success(200, manufacturer));
        }

        [HttpPost]
        public async Task<IActionResult> Add(ManufacturerCreateDto createDto)
        {
            var newManufacturer = _mapper.Map<Manufacturer>(createDto);
            newManufacturer.Id = Guid.NewGuid();
            await _manufacturerService.AddAsync(newManufacturer);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeManufacturers(List<ManufacturerCreateDto> createDtos)
        {
            await _manufacturerService.CreateRangeManufacturerAsync(createDtos);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(ManufacturerUpdateDto updateDto)
        {
            await _manufacturerService.UpdateManufacturerAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var manufacturer = await _manufacturerService.GetByIdAsync(id);
            await _manufacturerService.RemoveAsync(manufacturer);
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
