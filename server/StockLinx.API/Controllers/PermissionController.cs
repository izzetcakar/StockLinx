using AutoMapper;
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
    public class PermissionController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IPermissionService _permissionService;
        public PermissionController(IMapper mapper, IPermissionService permissionService)
        {
            _mapper = mapper;
            _permissionService = permissionService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var accessories = await _permissionService.GetPermissionDtos();
            return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(200, accessories));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var permission = await _permissionService.GetByIdAsync(id);
            var permissionDto = _mapper.Map<PermissionDto>(permission);
            return CreateActionResult(CustomResponseDto<PermissionDto>.Success(200, permissionDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(PermissionCreateDto createDto)
        {
            await _permissionService.CreatePermissionAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(PermissionUpdateDto updateDto)
        {
            await _permissionService.UpdatePermissionAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var permission = await _permissionService.GetByIdAsync(id);
            await _permissionService.RemoveAsync(permission);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
