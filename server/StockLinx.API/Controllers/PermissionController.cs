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
            var accessories = await _permissionService.GetAllPermissionDtos();
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
            var added = await _permissionService.CreatePermissionAsync(createDto);
            return CreateActionResult(CustomResponseDto<PermissionDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangePermissions(List<PermissionCreateDto> createDtos)
        {
            var added = await _permissionService.CreateRangePermissionAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(201, added));
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

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangePermissions(List<Guid> permissionIds)
        {
            await _permissionService.DeleteRangePermissionAsync(permissionIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
