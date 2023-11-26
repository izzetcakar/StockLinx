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
    public class DepartmentController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IDepartmentService _departmentService;
        public DepartmentController(IMapper mapper, IDepartmentService departmentService)
        {
            _mapper = mapper;
            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var departments = await _departmentService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<DepartmentDto>>.Success(200, departments));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var department = await _departmentService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Department>.Success(200, department));
        }

        [HttpPost]
        public async Task<IActionResult> Add(DepartmentCreateDto createDto)
        {
            var added = await _departmentService.CreateDepartmentAsync(createDto);
            return CreateActionResult(CustomResponseDto<DepartmentDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeDepartments(List<DepartmentCreateDto> createDtos)
        {
            var added = await _departmentService.CreateRangeDepartmentAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<DepartmentDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(DepartmentUpdateDto updateDto)
        {
            await _departmentService.UpdateDepartmentAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var department = await _departmentService.GetByIdAsync(id);
            await _departmentService.RemoveAsync(department);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeDepartments(List<Guid> departmentIds)
        {
            await _departmentService.DeleteRangeDepartmentAsync(departmentIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
