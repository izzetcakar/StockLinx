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
        private readonly IManufacturerService _manufacturerService;

        public ManufacturerController(IManufacturerService manufacturerService)
        {
            _manufacturerService = manufacturerService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                var manufacturers = await _manufacturerService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(200, manufacturers));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetManufacturersPaged(
            [FromQuery(Name = "$skip")] int? skip,
            [FromQuery(Name = "$take")] int? take,
            [FromQuery(Name = "$filter")] string filterExpression)
        {
            try
            {
                var filters = FilterExpression.ParseFilterExpression(filterExpression);

                var manufacturers = await _manufacturerService.GetManufacturersPagedAsync(skip ?? 0, take ?? 24, filters);

                return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(200, manufacturers));
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
                var manufacturerDto = await _manufacturerService.GetDto(id);
                return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(200, manufacturerDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ManufacturerCreateDto createDto)
        {
            try
            {
                var added = await _manufacturerService.CreateManufacturerAsync(createDto);
                return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeManufacturers(List<ManufacturerCreateDto> createDtos)
        {
            try
            {
                var added = await _manufacturerService.CreateRangeManufacturerAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ManufacturerUpdateDto updateDto)
        {
            try
            {
                var dto = await _manufacturerService.UpdateManufacturerAsync(updateDto);
                return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(200, dto));
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
                await _manufacturerService.DeleteManufacturerAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeManufacturers(List<Guid> manufacturerIds)
        {
            try
            {
                await _manufacturerService.DeleteRangeManufacturerAsync(manufacturerIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
