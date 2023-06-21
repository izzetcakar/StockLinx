using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
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
            var departments = await _departmentService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Department>>.Success(200, departments.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var department = await _departmentService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Department>.Success(200, department));
        }

        [HttpPost]
        public async Task<IActionResult> Add(DepartmentDto departmentDto)
        {
            //Create
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(DepartmentDto departmentDto)
        {
            //Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var department = await _departmentService.GetByIdAsync(id);
            await _departmentService.RemoveAsync(department);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
