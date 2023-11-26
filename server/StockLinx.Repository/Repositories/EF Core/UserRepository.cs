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

        public UserDto GetUserDto(User user)
        {
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }
        public List<UserDto> GetUserDtos(List<User> users)
        {
            var userDtos = new List<UserDto>();
            userDtos = _mapper.Map<List<UserDto>>(users);
            return userDtos;
        }
        public async Task<List<UserDto>> GetAllUserDtos()
        {
            var users = await dbContext.Users.AsNoTracking().ToListAsync();
            return GetUserDtos(users);
        }
    }
}
