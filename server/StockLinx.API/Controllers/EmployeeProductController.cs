using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeProductController : CustomBaseController
    {
        private readonly IEmployeeProductService _employeeProductService;

        public EmployeeProductController(IEmployeeProductService employeeProductService)
        {
            _employeeProductService = employeeProductService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<EmployeeProductDto> result = await _employeeProductService.GetAllDtosAsync();
                return CreateActionResult(
                    CustomResponseDto<List<EmployeeProductDto>>.Success(200, result)
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
                EmployeeProductDto result = await _employeeProductService.GetDtoAsync(id);
                return CreateActionResult(
                    CustomResponseDto<EmployeeProductDto>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(EmployeeProductCreateDto dto)
        {
            try
            {
                EmployeeProductDto result =
                    await _employeeProductService.CreateEmployeeProductAsync(dto);
                return CreateActionResult(
                    CustomResponseDto<EmployeeProductDto>.Success(201, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRange(List<EmployeeProductCreateDto> dto)
        {
            try
            {
                List<EmployeeProductDto> result =
                    await _employeeProductService.CreateRangeEmployeeProductAsync(dto);
                return CreateActionResult(
                    CustomResponseDto<List<EmployeeProductDto>>.Success(201, result)
                );
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
                await _employeeProductService.DeleteEmployeeProductAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
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
                List<EmployeeProductDto> result = await _employeeProductService.FilterAllAsync(
                    filter
                );
                return CreateActionResult(
                    CustomResponseDto<List<EmployeeProductDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("display")]
        public async Task<IActionResult> Display(List<Guid> ids)
        {
            try
            {
                List<EmployeeProductDisplayDto> result = await _employeeProductService.GetDisplayDtos(ids);

                return CreateActionResult(
                    CustomResponseDto<List<EmployeeProductDisplayDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
