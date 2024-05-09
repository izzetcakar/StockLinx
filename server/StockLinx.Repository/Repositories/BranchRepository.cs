using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class BranchRepository : Repository<Branch>, IBranchRepository
    {
        private readonly IMapper _mapper;
        public BranchRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }


        public BranchDto GetDto(Branch entity)
        {
            return _mapper.Map<BranchDto>(entity);
        }

        public List<BranchDto> GetDtos(List<Branch> entities)
        {
            List<BranchDto> dtos = new List<BranchDto>();
            dtos = _mapper.Map<List<BranchDto>>(entities);
            return dtos;
        }
        public async Task<List<BranchDto>> GetAllDtos()
        {
            var entities = await dbContext.Branches.AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
        public async Task<bool> CanDeleteAsync(Guid id)
        {
            await CheckExistAsync(id);
            bool assets = await dbContext.Assets.AnyAsync(a => a.BranchId == id);
            bool accessories = await dbContext.Accessories.AnyAsync(a => a.BranchId == id);
            bool components = await dbContext.Components.AnyAsync(c => c.BranchId == id);
            bool consumables = await dbContext.Consumables.AnyAsync(c => c.BranchId == id);
            bool licenses = await dbContext.Licenses.AnyAsync(l => l.BranchId == id);
            if (assets || accessories || components || consumables || licenses)
            {
                throw new Exception("Cannot delete branch because it has items.");
            }
            bool userProducts = await dbContext
                .UserProducts.AnyAsync(d => d.User.Department.BranchId == id);
            if (userProducts)
            {
                throw new Exception("Cannot delete branch because it is used in user products.");
            }
            bool users = await dbContext.Users.AnyAsync(u => u.Department.BranchId == id);
            if (users)
            {
                throw new Exception("Cannot delete branch because it has users.");
            }
            bool departments = await dbContext.Departments.AnyAsync(d => d.BranchId == id);
            if (departments)
            {
                throw new Exception("Cannot delete branch because it has departments.");
            }
            bool permissions = await dbContext.Permissions.AnyAsync(p => p.BranchId == id);
            if (permissions)
            {
                throw new Exception("Cannot delete branch because it has permissions.");
            }

            return true;
        }
    }
}
