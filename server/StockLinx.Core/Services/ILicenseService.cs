using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILicenseService : IService<License>
    {
        Task<List<LicenseDto>> GetAllDtos();
        Task<LicenseDto> CreateLicenseAsync(LicenseCreateDto createDto);
        Task<List<LicenseDto>> CreateRangeLicenseAsync(List<LicenseCreateDto> createDtos);
        Task UpdateLicenseAsync(LicenseUpdateDto updateDto);
        Task DeleteLicenseAsync(Guid licenseId);
        Task DeleteRangeLicenseAsync(List<Guid> licenseIds);
        Task<ProductCounter> GetAllCountAsync();
        Task<List<ProductStatusCounter>> GetStatusCount();
    }
}
