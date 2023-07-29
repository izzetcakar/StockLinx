using AutoMapper;
using Microsoft.AspNetCore.Http;
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
            var licenses = await _licenseService.GetAllAsync();
            var licenseDtos = _mapper.Map<List<LicenseDto>>(licenses).ToList();
            return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(200, licenseDtos));
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
            await _licenseService.CreateLicenseAsync(createDto);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(201));
        }

        [HttpPut]
        public async Task<IActionResult> Update(LicenseDto licenseDto)
        {
            // Update
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var license = await _licenseService.GetByIdAsync(id);
            await _licenseService.RemoveAsync(license);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }
    }
}
