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
                List<PermissionDto> result = await _permissionService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(200, result));
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
                PermissionDto result = await _permissionService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<PermissionDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(PermissionCreateDto dto)
        {
            try
            {
                PermissionDto result = await _permissionService.CreatePermissionAsync(dto);
                return CreateActionResult(CustomResponseDto<PermissionDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangePermissions(List<PermissionCreateDto> dtos)
        {
            try
            {
                List<PermissionDto> result = await _permissionService.CreateRangePermissionAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(201, result));
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
        public async Task<IActionResult> DeleteRangePermissions(List<Guid> ids)
        {
            try
            {
                await _permissionService.DeleteRangePermissionAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("sync")]
        public async Task<IActionResult> Sync(List<PermissionSyncDto> dtos)
        {
            try
            {
                List<PermissionDto> result = await _permissionService.Scyncronaize(dtos);
                return CreateActionResult(CustomResponseDto<List<PermissionDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
