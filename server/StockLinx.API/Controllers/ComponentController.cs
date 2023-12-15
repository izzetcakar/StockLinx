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
                var components = await _componentService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<ComponentDto>>.Success(200, components));
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
                var componentDto = await _componentService.GetDto(id);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, componentDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(ComponentCreateDto createDto)
        {
            try
            {
                var added = await _componentService.CreateComponentAsync(createDto);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeComponents(List<ComponentCreateDto> createDtos)
        {
            try
            {
                var added = await _componentService.CreateRangeComponentAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<ComponentDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(ComponentUpdateDto updateDto)
        {
            try
            {
                var dto = await _componentService.UpdateComponentAsync(updateDto);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, dto));
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
        public async Task<IActionResult> DeleteRangeComponents(List<Guid> componentIds)
        {
            try
            {
                await _componentService.DeleteRangeComponentAsync(componentIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInComponent(ComponentCheckInDto checkInDto)
        {
            try
            {
                var dto = await _componentService.CheckIn(checkInDto);
                return CreateActionResult(CustomResponseDto<ComponentCheckInResponseDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOutComponent(Guid id)
        {
            try
            {
                var dto = await _componentService.CheckOut(id);
                return CreateActionResult(CustomResponseDto<ComponentDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
