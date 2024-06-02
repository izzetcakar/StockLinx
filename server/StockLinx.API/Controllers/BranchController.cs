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
    public class BranchController : CustomBaseController
    {
        private readonly IBranchService _branchService;

        public BranchController(IBranchService branchService)
        {
            _branchService = branchService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            try
            {
                List<BranchDto> result = await _branchService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<BranchDto>>.Success(200, result));
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
                BranchDto result = await _branchService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<BranchDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(BranchCreateDto dto)
        {
            try
            {
                BranchDto result = await _branchService.CreateBranchAsync(dto);
                return CreateActionResult(CustomResponseDto<BranchDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeBranches(List<BranchCreateDto> dtos)
        {
            try
            {
                List<BranchDto> result = await _branchService.CreateRangeBranchAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<BranchDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(BranchUpdateDto dto)
        {
            try
            {
                BranchDto result = await _branchService.UpdateBranchAsync(dto);
                return CreateActionResult(CustomResponseDto<BranchDto>.Success(200, result));
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
                await _branchService.DeleteBranchAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeBranches(List<Guid> ids)
        {
            try
            {
                await _branchService.DeleteRangeBranchAsync(ids);
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
                List<BranchDto> result = await _branchService.FilterAllAsync(filter);
                return CreateActionResult(CustomResponseDto<List<BranchDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
