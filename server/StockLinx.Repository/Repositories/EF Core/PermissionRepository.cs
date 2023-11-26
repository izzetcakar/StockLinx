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

        public PermissionDto GetDto(Permission entity)
        {
            return _mapper.Map<PermissionDto>(entity);
        }
        public List<PermissionDto> GetDtos(List<Permission> entities)
        {
            var dtos = new List<PermissionDto>();
            dtos = _mapper.Map<List<PermissionDto>>(entities);
            return dtos;
        }
        public async Task<List<PermissionDto>> GetAllDtos()
        {
            var entities = await dbContext.Permissions.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
