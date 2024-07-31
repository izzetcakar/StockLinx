using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Services;

namespace StockLinx.API.Controllers
{
    [Authorize]
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
            try
            {
                List<CompanyDto> result = await _companyService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<CompanyDto>>.Success(200, result));
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
                CompanyDto result = await _companyService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<CompanyDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(CompanyCreateDto dto)
        {
            try
            {
                CompanyDto result = await _companyService.CreateCompanyAsync(dto);
                return CreateActionResult(CustomResponseDto<CompanyDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeCompanies(List<CompanyCreateDto> dtos)
        {
            try
            {
                List<CompanyDto> result = await _companyService.CreateRangeCompanyAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<CompanyDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(CompanyUpdateDto dto)
        {
            try
            {
                CompanyDto result = await _companyService.UpdateCompanyAsync(dto);
                return CreateActionResult(CustomResponseDto<CompanyDto>.Success(200, result));
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
                await _companyService.DeleteCompanyAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeCompanies(List<Guid> ids)
        {
            try
            {
                await _companyService.DeleteRangeCompanyAsync(ids);
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
                List<CompanyDto> result = await _companyService.FilterAllAsync(filter);
                return CreateActionResult(CustomResponseDto<List<CompanyDto>>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("display")]
        public async Task<IActionResult> Display(List<Guid> ids)
        {
            try
            {
                List<CompanyDisplayDto> result = await _companyService.GetDisplayDtos(ids);

                return CreateActionResult(
                    CustomResponseDto<List<CompanyDisplayDto>>.Success(200, result)
                );
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
