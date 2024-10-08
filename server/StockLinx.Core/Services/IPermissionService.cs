﻿using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IPermissionService : IService<Permission>
    {
        Task<PermissionDto> GetDtoAsync(Guid id);
        Task<List<PermissionDto>> GetAllDtosAsync();
        Task<PermissionDto> CreatePermissionAsync(PermissionCreateDto dto);
        Task<List<PermissionDto>> CreateRangePermissionAsync(List<PermissionCreateDto> dtos);
        Task DeletePermissionAsync(Guid id);
        Task DeleteRangePermissionAsync(List<Guid> ids);
        Task<List<PermissionDto>> FilterAllAsync(string filter);
        Task<List<Company>> GetUserCompaniesAsync();
        Task<bool> VerifyCompanyAccessAsync(Guid companyId);
        Task<List<Guid>> GetCompanyIdsAsync();
        Task<List<PermissionDisplayDto>> GetDisplayDtos(List<Guid> ids);
    }
}
