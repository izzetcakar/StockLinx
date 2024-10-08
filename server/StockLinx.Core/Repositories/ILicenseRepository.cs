﻿using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ILicenseRepository : IRepository<License>
    {
        Task<LicenseDto> GetDtoAsync(License entity);
        Task<List<LicenseDto>> GetDtosAsync(List<License> entities);
        Task<List<LicenseDto>> GetAllDtosAsync();
        Task<List<LicenseDto>> GetAllDtosAsync(List<Guid> companyIds);
        Task CanDeleteAsync(Guid id);
        Task<int> GetAvaliableQuantityAsync(License entity);
        Task<List<LicenseDisplayDto>> GetDisplayDtos(List<Guid> ids);
        Task<List<LicenseProductDisplayDto>> GetProductDisplayDtos(List<Guid> ids);
    }
}
