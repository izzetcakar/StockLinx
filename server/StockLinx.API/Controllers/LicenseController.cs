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
    public class LicenseController : CustomBaseController
    {
        private readonly ILicenseService _licenseService;

        public LicenseController(ILicenseService licenseService)
        {
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
            var licenseDto = await _licenseService.GetDto(id);
            return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, licenseDto));
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
            var dto = await _licenseService.UpdateLicenseAsync(updateDto);
            return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, dto));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _licenseService.DeleteLicenseAsync(id);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeLicenses(List<Guid> licenseIds)
        {
            await _licenseService.DeleteRangeLicenseAsync(licenseIds);
            return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInLicense(LicenseCheckInDto checkInDto)
        {
            var dto = await _licenseService.CheckIn(checkInDto);
            return CreateActionResult(CustomResponseDto<LicenseCheckInResponseDto>.Success(200, dto));
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOutLicense(Guid id)
        {
            var dto = await _licenseService.CheckOut(id);
            return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, dto));
        }
    }
}
