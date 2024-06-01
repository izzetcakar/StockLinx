using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ILicenseRepository : IRepository<License>
    {
        Task<LicenseDto> GetDtoAsync(License entity);
        Task<List<LicenseDto>> GetDtosAsync(List<License> entities);
        Task<List<LicenseDto>> GetAllDtosAsync();
        Task<bool> CanDeleteAsync(Guid id);
        Task<int> GetAvaliableQuantityAsync(License entity);
    }
}
