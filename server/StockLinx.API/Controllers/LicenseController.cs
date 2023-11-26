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
    public class LicenseController : CustomBaseController
    {
        private readonly IMapper _mapper;
        private readonly ILicenseService _licenseService;

        public LicenseController(IMapper mapper, ILicenseService licenseService)
        {
            _mapper = mapper;
            _licenseService = licenseService;
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var licenses = await _licenseService.GetAllDtos();
            return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(200, licenses));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var license = await _licenseService.GetByIdAsync(id);
            return CreateActionResult(CustomResponseDto<License>.Success(200, license));
        }

        [HttpPost]
        public async Task<IActionResult> Add(LicenseCreateDto createDto)
        {
            var added = await _licenseService.CreateLicenseAsync(createDto);
            return CreateActionResult(CustomResponseDto<LicenseDto>.Success(201, added));
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeLicenses(List<LicenseCreateDto> createDtos)
        {
            var added = await _licenseService.CreateRangeLicenseAsync(createDtos);
            return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(201, added));
        }

        [HttpPut]
        public async Task<IActionResult> Update(LicenseUpdateDto updateDto)
        {
            await _licenseService.UpdateLicenseAsync(updateDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var license = await _licenseService.GetByIdAsync(id);
            await _licenseService.RemoveAsync(license);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeLicenses(List<Guid> licenseIds)
        {
            await _licenseService.DeleteRangeLicenseAsync(licenseIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
