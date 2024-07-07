using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IPermissionRepository : IRepository<Permission>
    {
        PermissionDto GetDto(Permission entity);
        List<PermissionDto> GetDtos(List<Permission> entities);
        Task<List<PermissionDto>> GetAllDtosAsync();
        Task<List<Company>> GetUserCompaniesAsync(Guid userId);
        Task<List<Guid>> GetCompanyIdsAsync(Guid userId);
    }
}
