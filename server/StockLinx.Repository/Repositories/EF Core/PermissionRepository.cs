using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class PermissionRepository : Repository<Permission>, IPermissionRepository
    {
        private readonly IMapper _mapper;
        public PermissionRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public PermissionDto GetPermissionDto(Permission permission)
        {
            var permissionDto = _mapper.Map<PermissionDto>(permission);
            return permissionDto;
        }
        public List<PermissionDto> GetPermissionDtos(List<Permission> permissions)
        {
            var permissionDtos = new List<PermissionDto>();
            permissionDtos = _mapper.Map<List<PermissionDto>>(permissions);
            return permissionDtos;
        }
        public async Task<List<PermissionDto>> GetAllPermissionDtos()
        {
            var permissions = await dbContext.Permissions.AsNoTracking().ToListAsync();
            return GetPermissionDtos(permissions);
        }
    }
}
