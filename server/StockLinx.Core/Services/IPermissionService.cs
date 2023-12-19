using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IPermissionService : IService<Permission>
    {
        Task<PermissionDto> GetDto(Guid id);
        Task<List<PermissionDto>> GetAllDtos();
        Task<PermissionDto> CreatePermissionAsync(PermissionCreateDto createDto);
        Task<List<PermissionDto>> CreateRangePermissionAsync(List<PermissionCreateDto> createDtos);
        Task DeletePermissionAsync(Guid permissionId);
        Task DeleteRangePermissionAsync(List<Guid> permissionIds);
        Task<List<PermissionDto>> Scyncronaize(List<PermissionSyncDto> createDtos);
    }
}
