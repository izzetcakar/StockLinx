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
                List<LicenseDto> result = await _licenseService.GetAllDtosAsync();
                return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(200, result));
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
                LicenseDto result = await _licenseService.GetDtoAsync(id);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add(LicenseCreateDto dto)
        {
            try
            {
                LicenseDto result = await _licenseService.CreateLicenseAsync(dto);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("range")]
        public async Task<IActionResult> AddRangeLicenses(List<LicenseCreateDto> dtos)
        {
            try
            {
                List<LicenseDto> result = await _licenseService.CreateRangeLicenseAsync(dtos);
                return CreateActionResult(CustomResponseDto<List<LicenseDto>>.Success(201, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(LicenseUpdateDto dto)
        {
            try
            {
                LicenseDto result = await _licenseService.UpdateLicenseAsync(dto);
                return CreateActionResult(CustomResponseDto<LicenseDto>.Success(200, result));
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
        public async Task<IActionResult> DeleteRangeLicenses(List<Guid> ids)
        {
            try
            {
                await _licenseService.DeleteRangeLicenseAsync(ids);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin/user")]
        public async Task<IActionResult> CheckInLicense(UserProductCheckInDto dto)
        {
            try
            {
                UserProduct result = await _licenseService.CheckInAsync(dto);
                return CreateActionResult(CustomResponseDto<UserProduct>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkin/asset")]
        public async Task<IActionResult> CheckInLicense(AssetProductCheckInDto dto)
        {
            try
            {
                AssetProduct result = await _licenseService.CheckInAsync(dto);
                return CreateActionResult(CustomResponseDto<AssetProduct>.Success(200, result));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/user")]
        public async Task<IActionResult> UserCheckOutLicense(UserProductCheckOutDto dto)
        {
            try
            {
                await _licenseService.UserCheckOutAsync(dto);
                return CreateActionResult(CustomResponseDto<NoContentDto>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentDto>.Fail(401, ex.Message));
            }
        }

        [HttpPost("checkout/asset")]
        public async Task<IActionResult> AssetCheckOutLicense(AssetProductCheckOutDto dto)
        {
            try
            {
                await _licenseService.AssetCheckOutAsync(dto);
                return CreateActionResult(CustomResponseDto<NoContentResult>.Success(200));
            }
            catch (Exception ex)
            {
                return CreateActionResult(CustomResponseDto<NoContentResult>.Fail(500, ex.Message));
            }
        }
    }
}
