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
            return _mapper.Map<UserDto>(entity);
        }
        public List<UserDto> GetDtos(List<User> entities)
        {
            var dtos = new List<UserDto>();
            dtos = _mapper.Map<List<UserDto>>(entities);
            return dtos;
        }
        public async Task<List<UserDto>> GetAllDtos()
        {
            var entities = await dbContext.Users.Where(u => u.DeletedDate == null).AsNoTracking().ToListAsync();
            return GetDtos(entities);
        }
    }
}
