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

        public PermissionRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public PermissionDto GetDto(Permission entity)
        {
            var dto = _mapper.Map<PermissionDto>(entity);
            var companyId = dbContext
                .Branches.Where(b => b.Id == entity.BranchId)
                .Select(b => b.CompanyId)
                .FirstOrDefault();
            dto.CompanyId = companyId;
            return dto;
        }

        public List<PermissionDto> GetDtos(List<Permission> entities)
        {
            var dtos = new List<PermissionDto>();
            foreach (var entity in entities)
            {
                var dto = GetDto(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<PermissionDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Permissions.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
