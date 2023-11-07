﻿using AutoMapper;
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
            var branchs = await _branchService.GetAllAsync();
            var branchDtos = _mapper.Map<List<BranchDto>>(branchs).ToList();
            return CreateActionResult(CustomResponseDto<List<BranchDto>>.Success(200, branchDtos));
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
            await _branchService.CreateBranchAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
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
    }
}