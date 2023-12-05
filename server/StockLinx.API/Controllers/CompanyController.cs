﻿using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : CustomBaseController
    {
        private readonly ICompanyService _companyService;
        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var companies = await _companyService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<CompanyDto>>.Success(200, companies));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var companyDto = await _companyService.GetDto(id);
            return CreateActionResult(CustomResponseDto<CompanyDto>.Success(200, companyDto));
        }

        [HttpPost]
        public async Task<IActionResult> Add(CompanyCreateDto createDto)
        {
            var added = await _companyService.CreateCompanyAsync(createDto);
            return CreateActionResult(CustomResponseDto<CompanyDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeCompanies(List<CompanyCreateDto> createDtos)
        {
            var added = await _companyService.CreateRangeCompanyAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<CompanyDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(CompanyUpdateDto updateDto)
        {
            await _companyService.UpdateCompanyAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var company = await _companyService.GetByIdAsync(id);
            await _companyService.RemoveAsync(company);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeCompanies(List<Guid> companyIds)
        {
            await _companyService.DeleteRangeCompanyAsync(companyIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
