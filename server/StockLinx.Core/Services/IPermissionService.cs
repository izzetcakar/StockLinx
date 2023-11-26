﻿using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IPermissionService : IService<Permission>
    {
        Task<List<PermissionDto>> GetAllPermissionDtos();
        Task<PermissionDto> CreatePermissionAsync(PermissionCreateDto createDto);
        Task<List<PermissionDto>> CreateRangePermissionAsync(List<PermissionCreateDto> createDtos);
        Task UpdatePermissionAsync(PermissionUpdateDto updateDto);
        Task DeletePermissionAsync(Guid permissionId);
        Task DeleteRangePermissionAsync(List<Guid> permissionIds);
    }
}
