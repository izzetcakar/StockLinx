using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly ICompanyService _companyService;
        public CompanyController(IMapper mapper, ICompanyService companyService)
        {
            _mapper = mapper;
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var companies = await _companyService.GetAllAsync();
            return CreateActionResult(CustomResponseDto<List<Company>>.Success(200, companies.ToList()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var company = await _companyService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<Company>.Success(200, company));
        }

        [HttpPost]
        public async Task<IActionResult> Add(CompanyCreateDto createDto)
        {
            await _companyService.CreateCompanyAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(CompanyDto companyDto)
        {
            //Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var company = await _companyService.GetByIdAsync(id);
            await _companyService.RemoveAsync(company);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
