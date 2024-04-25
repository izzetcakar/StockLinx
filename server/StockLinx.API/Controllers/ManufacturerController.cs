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
            try
            {
                List<ManufacturerDto> result = await _manufacturerService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(200, result));
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
                ManufacturerDto result = await _manufacturerService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ManufacturerCreateDto dto)
        {
            try
            {
                ManufacturerDto result = await _manufacturerService.CreateManufacturerAsync(dto);
                return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeManufacturers(List<ManufacturerCreateDto> dtos)
        {
            try
            {
                List<ManufacturerDto> result = await _manufacturerService.CreateRangeManufacturerAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<ManufacturerDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ManufacturerUpdateDto dto)
        {
            try
            {
                ManufacturerDto result = await _manufacturerService.UpdateManufacturerAsync(dto);
                return CreateActionResult(CustomResponseDto<ManufacturerDto>.Success(200, result));
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
        public async Task<IActionResult> DeleteRangeManufacturers(List<Guid> ids)
        {
            try
            {
                await _manufacturerService.DeleteRangeManufacturerAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
