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
    public class BranchController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly IBranchService _branchService;
        public BranchController(IMapper mapper, IBranchService branchService)
        {
            _mapper = mapper;
            _branchService = branchService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var branchs = await _branchService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<BranchDto>>.Success(200, branchs));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var branch = await _branchService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Branch>.Success(200, branch));
        }

        [HttpPost]
        public async Task<IActionResult> Add(BranchCreateDto createDto)
        {
            var added = await _branchService.CreateBranchAsync(createDto);
            return CreateActionResult(CustomResponseDto<BranchDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeBranches(List<BranchCreateDto> createDtos)
        {
            var added = await _branchService.CreateRangeBranchAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<BranchDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(BranchUpdateDto updateDto)
        {
            await _branchService.UpdateBranchAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var branch = await _branchService.GetByIdAsync(id);
            await _branchService.RemoveAsync(branch);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeBranches(List<Guid> branchIds)
        {
            await _branchService.DeleteRangeBranchAsync(branchIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
