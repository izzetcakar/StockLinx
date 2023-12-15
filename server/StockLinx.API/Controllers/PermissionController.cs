using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : CustomBaseController
    {
        private readonly IPermissionService _permissionService;
        public PermissionController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                var accessories = await _permissionService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(200, accessories));
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
                var permissionDto = await _permissionService.GetDto(id);
                return CreateActionResult(CustomResponseDto<PermissionDto>.Success(200, permissionDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(PermissionCreateDto createDto)
        {
            try
            {
                var added = await _permissionService.CreatePermissionAsync(createDto);
                return CreateActionResult(CustomResponseDto<PermissionDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangePermissions(List<PermissionCreateDto> createDtos)
        {
            try
            {
                var added = await _permissionService.CreateRangePermissionAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(201, added));
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
                await _permissionService.DeletePermissionAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangePermissions(List<Guid> permissionIds)
        {
            try
            {
                await _permissionService.DeleteRangePermissionAsync(permissionIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
