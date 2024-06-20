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
    public class ComponentController : CustomBaseController
    {
        private readonly IComponentService _componentService;

        public ComponentController(IComponentService componentService)
        {
            _componentService = componentService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<ComponentDto> result = await _componentService.GetAllDtosAsync();
                return CreateActionResult(
                    CustomResponseDto<List<ComponentDto>>.Success(200, result)
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
                ComponentDto result = await _componentService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ComponentCreateDto dto)
        {
            try
            {
                ComponentDto result = await _componentService.CreateComponentAsync(dto);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeComponents(List<ComponentCreateDto> dtos)
        {
            try
            {
                List<ComponentDto> result = await _componentService.CreateRangeComponentAsync(dtos);
                return CreateActionResult(
                    CustomResponseDto<List<ComponentDto>>.Success(201, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ComponentUpdateDto dto)
        {
            try
            {
                ComponentDto result = await _componentService.UpdateComponentAsync(dto);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, result));
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
                await _componentService.DeleteComponentAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeComponents(List<Guid> ids)
        {
            try
            {
                await _componentService.DeleteRangeComponentAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInComponent(AssetProductCheckInDto dto)
        {
            try
            {
                AssetProductDto result = await _componentService.CheckInAsync(dto);
                return CreateActionResult(CustomResponseDto<AssetProductDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CheckOutComponent(AssetProductCheckOutDto dto)
        {
            try
            {
                List<AssetProductDto> result = await _componentService.CheckOutAsync(dto);
                return CreateActionResult(CustomResponseDto<List<AssetProductDto>>.Success(200, result));
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
                List<ComponentDto> result = await _componentService.FilterAllAsync(filter);
                return CreateActionResult(
                    CustomResponseDto<List<ComponentDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
