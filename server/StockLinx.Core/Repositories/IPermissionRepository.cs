using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IPermissionRepository : IRepository<Permission>
    {
        PermissionDto GetDto(Permission entity);
        List<PermissionDto> GetDtos(List<Permission> entities);
        Task<List<PermissionDto>> GetAllDtos();
    }
}
