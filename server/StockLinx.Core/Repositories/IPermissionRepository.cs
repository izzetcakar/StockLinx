using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IPermissionRepository : IRepository<Permission>
    {
        PermissionDto GetPermissionDto(Permission permission);
        List<PermissionDto> GetPermissionDtos(List<Permission> permissions);
        Task<List<PermissionDto>> GetAllPermissionDtos();
    }
}
