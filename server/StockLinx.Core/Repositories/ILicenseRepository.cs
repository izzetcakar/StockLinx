using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ILicenseRepository : IRepository<License>
    {
        Task<LicenseDto> GetDto(License entity);
        Task<List<LicenseDto>> GetDtos(List<License> entities);
        Task<List<LicenseDto>> GetAllDtos();
        Task<bool> CanDelete(Guid id);
    }
}
