using AutoMapper;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly IMapper _mapper;
        public UserRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public string GetMyName()
        {
            throw new NotImplementedException();
        }

        public async Task<User> Login(UserLoginDto userLoginDto)
        {
            var isExist = await dbContext.Users.AnyAsync(x => x.Email == userLoginDto.Email && x.Password == userLoginDto.Password);
            if (!isExist)
            {
                throw new Exception("User is not found");
            }
            else
            {
                return await dbContext.Users.Where(x => x.Email == userLoginDto.Email && x.Password == userLoginDto.Password).SingleOrDefaultAsync();
            }
        }

        public Task Logout()
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            var nameExist = await dbContext.Users.AnyAsync(x => x.Email == user.Email);
            var emailExist = await dbContext.Users.AnyAsync(x => x.Email == user.Email);

            if (nameExist)
            {
                throw new Exception("Username already exists");
            }
            else if (emailExist)
            {
                throw new Exception("Email already exists");
            }
            else
            {
                await dbContext.Users.AddAsync(user);
                await dbContext.SaveChangesAsync();
                return await dbContext.Users.Where(x => x.Email == user.Email).SingleOrDefaultAsync();
            }
        }
    }
}
