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
            try
            {
                var licenses = await _licenseService.GetAllDtos();
                return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(200, licenses));
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
                var licenseDto = await _licenseService.GetDto(id);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, licenseDto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(LicenseCreateDto createDto)
        {
            try
            {
                var added = await _licenseService.CreateLicenseAsync(createDto);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeLicenses(List<LicenseCreateDto> createDtos)
        {
            try
            {
                var added = await _licenseService.CreateRangeLicenseAsync(createDtos);
                return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(201, added));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(LicenseUpdateDto updateDto)
        {
            try
            {
                var dto = await _licenseService.UpdateLicenseAsync(updateDto);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, dto));
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
                await _licenseService.DeleteLicenseAsync(id);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpDelete("range")]
        public async Task<IActionResult> DeleteRangeLicenses(List<Guid> licenseIds)
        {
            try
            {
                await _licenseService.DeleteRangeLicenseAsync(licenseIds);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInLicense(LicenseCheckInDto checkInDto)
        {
            try
            {
                var dto = await _licenseService.CheckIn(checkInDto);
                return CreateActionResult(CustomResponseDto<LicenseCheckInResponseDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/{id}")]
        public async Task<IActionResult> CheckOutLicense(Guid id)
        {
            try
            {
                var dto = await _licenseService.CheckOut(id);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, dto));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }
    }
}
