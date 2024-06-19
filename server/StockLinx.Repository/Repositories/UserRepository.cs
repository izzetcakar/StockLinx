using System.Data.Entity;
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

        public UserRepository(AppDbContext dbContext, IMapper mapper)
            : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<UserDto> GetDtoAsync(User entity)
        {
            var dto = _mapper.Map<UserDto>(entity);
            dto.CompanyId = await dbContext
                .Departments.Where(b => b.Id == entity.DepartmentId)
                .Select(b => b.CompanyId)
                .FirstOrDefaultAsync();
            return dto;
        }

        public async Task<List<UserDto>> GetDtosAsync(List<User> entities)
        {
            var dtos = new List<UserDto>();
            foreach (var entity in entities)
            {
                var dto = await GetDtoAsync(entity);
                dtos.Add(dto);
            }
            return dtos;
        }

        public async Task<List<UserDto>> GetAllDtosAsync()
        {
            var entities = await dbContext.Users.ToListAsync();
            return await GetDtosAsync(entities);
        }

        public async Task<bool> CanDeleteAsync(Guid id)
        {
            var userProducts = await dbContext.UserProducts.AnyAsync(dp => dp.UserId == id);
            if (userProducts)
            {
                throw new Exception("User has deployed items");
            }
            return true;
        }
    }
}
