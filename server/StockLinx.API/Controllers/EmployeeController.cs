using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : CustomBaseController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<EmployeeDto> result = await _employeeService.GetAllDtosAsync();
                return CreateActionResult(
                    CustomResponseDto<List<EmployeeDto>>.Success(200, result)
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
                EmployeeDto result = await _employeeService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<EmployeeDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(EmployeeCreateDto dto)
        {
            try
            {
                EmployeeDto result = await _employeeService.CreateEmployeeAsync(dto);
                return CreateActionResult(CustomResponseDto<EmployeeDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeEmployees(List<EmployeeCreateDto> dtos)
        {
            try
            {
                List<EmployeeDto> result = await _employeeService.CreateRangeEmployeeAsync(dtos);
                return CreateActionResult(
                    CustomResponseDto<List<EmployeeDto>>.Success(201, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(EmployeeUpdateDto dto)
        {
            try
            {
                EmployeeDto result = await _employeeService.UpdateEmployeeAsync(dto);
                return CreateActionResult(CustomResponseDto<EmployeeDto>.Success(200, result));
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
                await _employeeService.DeleteEmployeeAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeEmployees(List<Guid> ids)
        {
            try
            {
                await _employeeService.DeleteRangeEmployeeAsync(ids);
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
                List<EmployeeDto> result = await _employeeService.FilterAllAsync(filter);
                return CreateActionResult(
                    CustomResponseDto<List<EmployeeDto>>.Success(200, result)
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
                List<EmployeeDisplayDto> result = await _employeeService.GetDisplayDtos(ids);

                return CreateActionResult(
                    CustomResponseDto<List<EmployeeDisplayDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
