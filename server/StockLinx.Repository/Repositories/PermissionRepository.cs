using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Generic.Display;
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
            return _mapper.Map<PermissionDto>(entity);
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

        public async Task<List<Company>> GetUserCompaniesAsync(Guid userId)
        {
            bool isAdmin = await dbContext
                .Users.Where(u => u.Id == userId)
                .Select(u => u.IsAdmin)
                .FirstOrDefaultAsync();
            if (isAdmin)
            {
                return await dbContext.Companies.ToListAsync();
            }
            List<Guid> ids = await dbContext
                .Permissions.Where(p => p.UserId == userId)
                .Select(p => p.CompanyId)
                .Distinct()
                .ToListAsync();
            return await dbContext.Companies.Where(c => ids.Contains(c.Id)).ToListAsync();
        }

        public Task<List<Guid>> GetCompanyIdsAsync(Guid userId)
        {
            bool isAdmin = dbContext
                .Users.Where(u => u.Id == userId)
                .Select(u => u.IsAdmin)
                .FirstOrDefault();
            if (isAdmin)
            {
                return dbContext.Companies.Select(c => c.Id).ToListAsync();
            }
            return dbContext
                .Permissions.Where(p => p.UserId == userId)
                .Select(p => p.CompanyId)
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<PermissionDisplayDto>> GetDisplayDtos(List<Guid> ids)
        {
            var query = dbContext
                .Permissions.Where(d => ids.Contains(d.Id))
                .Select(d => new PermissionDisplayDto
                {
                    User = d.User.FirstName + " " + d.User.LastName,
                    Company = d.Company.Name,
                });
            return await query.ToListAsync();
        }
    }
}
