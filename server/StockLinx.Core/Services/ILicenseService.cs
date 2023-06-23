using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILicenseService : IService<License>
    {
        Task CreateLicenseAsync(LicenseCreateDto createDto);
        Task UpdateLicenseAsync(LicenseUpdateDto updateDto);
        Task DeleteLicenseAsync(Guid licenseId);
    }
}
