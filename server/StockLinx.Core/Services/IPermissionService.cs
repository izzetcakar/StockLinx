using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IPermissionService : IService<Permission>
    {
        Task<List<PermissionDto>> GetPermissionDtos();
        Task CreatePermissionAsync(PermissionCreateDto createDto);
        Task UpdatePermissionAsync(PermissionUpdateDto updateDto);
        Task DeletePermissionAsync(Guid accessoryId);
    }
}
