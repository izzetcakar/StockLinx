using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;
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
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IRepository<User> repository, IUnitOfWork unitOfWork,
            IUserRepository userRepository, IHttpContextAccessor httpContextAccessor) : base(repository, unitOfWork)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }
        public Guid GetIdByToken()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                string userIdString = _httpContextAccessor.HttpContext.User.FindFirstValue("UserId");
                if (Guid.TryParse(userIdString, out Guid userIdGuid))
                {
                    return userIdGuid;
                }
                else
                {
                    throw new FormatException("Invalid UserId format");
                }
            }
            else
            {
                throw new NotImplementedException("Invalid Token");
            }
        }
        public async Task<User> GetCurrentUser()
        {
            var userId = GetIdByToken();
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User is not found");
            }
            else
            {
                return user;
            }
        }
        public async Task<User> Login(UserLoginDto userLoginDto)
        {

            var isExist = await _userRepository.AnyAsync(x => x.Email == userLoginDto.Email && x.Password == userLoginDto.Password);
            if (!isExist)
            {
                throw new Exception("User is not found");
            }
            else
            {
                return await _userRepository.Where(x => x.Email == userLoginDto.Email && x.Password == userLoginDto.Password).SingleOrDefaultAsync();
            }
        }

        public Task Logout()
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            var employeeNoExist = await _userRepository.AnyAsync(x => x.EmployeeNo == user.EmployeeNo);
            var emailExist = await _userRepository.AnyAsync(x => x.Email == user.Email);

            if (employeeNoExist)
            {
                throw new Exception("EmployeeNo already exists");
            }
            else if (emailExist)
            {
                throw new Exception("Email already exists");
            }
            else
            {
                await AddAsync(user);
                await _unitOfWork.CommitAsync();
                return await _userRepository.Where(x => x.Email == user.Email).SingleOrDefaultAsync();
            }
        }

        public Task UpdateUserAsync(UserUpdateDto updateDto)
        {
            throw new NotImplementedException();
        }
        public Task DeleteUserAsync(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}
