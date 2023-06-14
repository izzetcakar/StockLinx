using AutoMapper;
using Microsoft.AspNetCore.Http;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Models;
using StockLinx.Core.Repositories;
using StockLinx.Core.Services;
using StockLinx.Core.UnitOfWork;
using System.Security.Claims;

namespace StockLinx.Service.Services
{
    public class UserService : Service<User>, IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;

        public UserService(IRepository<User> repository, IUnitOfWork unitOfWork,
            IUserRepository userRepository, IHttpContextAccessor httpContextAccessor) : base(repository, unitOfWork)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue("UserId");
                return result;
            }
            else
            {
                throw new NotImplementedException("Invalid Token");
            }
        }

        public async Task<User> Login(UserLoginDto userLoginDto)
        {
            return await _userRepository.Login(userLoginDto);
        }

        public Task Logout()
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            return await _userRepository.Register(user);
        }
    }
}
