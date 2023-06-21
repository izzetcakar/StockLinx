using StockLinx.Core.DTOs.Create;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface ILicenseService : IService<License>
    {
        Task CreateLicenseAsync(LicenseCreateDto createDto);
    }
}
