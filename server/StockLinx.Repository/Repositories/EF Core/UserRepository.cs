using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly IMapper _mapper;
        public UserRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public UserDto GetDto(User entity)
        {
            var dto = _mapper.Map<UserDto>(entity);
            var department = dbContext.Departments.Where(d => d.Id == entity.DepartmentId && d.DeletedDate == null).FirstOrDefault();
            var branch = dbContext.Branches.Where(b => b.Id == department.BranchId && b.DeletedDate == null).FirstOrDefault();
            dto.CompanyId = dbContext.Branches.Where(b => b.Id == branch.Id && b.DeletedDate == null).Select(b => b.CompanyId).FirstOrDefault();
            return dto;
        }
        public List<UserDto> GetDtos(List<User> entities)
        {
            var dtos = new List<UserDto>();
            foreach (var entity in entities)
            {
                var dto = GetDto(entity);
                dtos.Add(dto);
            }
            return dtos;
        }
        public async Task<List<UserDto>> GetAllDtos()
        {
            var entities = await dbContext.Users.Where(u => u.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
