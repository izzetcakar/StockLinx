using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ILicenseRepository : IRepository<License>
    {
        Task<LicenseDto> GetLicenseDto(License license);
        Task<List<LicenseDto>> GetLicenseDtos(List<License> licenses);
        Task<List<LicenseDto>> GetAllLicenseDtos();
    }
}
