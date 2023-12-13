using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IRepository<User> repository, IUnitOfWork unitOfWork, IUserRepository userRepository,
             IMapper mapper, IHttpContextAccessor httpContextAccessor) : base(repository, unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task<UserDto> GetDto(Guid id)
        {
            var user = await GetByIdAsync(id);
            return _userRepository.GetDto(user);
        }
        public async Task<List<UserDto>> GetAllDtos()
        {
            return await _userRepository.GetAllDtos();
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

        public async Task<User> Register(UserCreateDto createUser)
        {
            var user = _mapper.Map<User>(createUser);
            var userId = Guid.NewGuid();
            user.Id = userId;
            user.CreatedDate = DateTime.UtcNow;
            user.IsAdmin = false;
            var employeeNoExist = await _userRepository.AnyAsync(x => x.EmployeeNo == user.EmployeeNo);

            if (employeeNoExist)
            {
                throw new Exception("EmployeeNo already exists");
            }
            else
            {
                await AddAsync(user);
                await _unitOfWork.CommitAsync();
                var returnedUser = await _userRepository.Where(x => x.Id == userId).SingleOrDefaultAsync();
                return returnedUser;
            }
        }

        public async Task<UserDto> CreateUserAsync(UserCreateDto createDto)
        {
            var newUser = _mapper.Map<User>(createDto);
            newUser.Id = Guid.NewGuid();
            newUser.CreatedDate = DateTime.UtcNow;
            await _userRepository.AddAsync(newUser);
            await _unitOfWork.CommitAsync();
            return _userRepository.GetDto(newUser);
        }

        public async Task<List<UserDto>> CreateRangeUserAsync(List<UserCreateDto> createDtos)
        {
            var newUsers = new List<User>();
            foreach (var createDto in createDtos)
            {
                var newUser = _mapper.Map<User>(createDto);
                newUser.Id = Guid.NewGuid();
                newUser.CreatedDate = DateTime.UtcNow;
                newUsers.Add(newUser);
            }
            await _userRepository.AddRangeAsync(newUsers);
            await _unitOfWork.CommitAsync();
            return _userRepository.GetDtos(newUsers);
        }

        public async Task<UserDto> UpdateUserAsync(UserUpdateDto updateDto)
        {
            var userInDb = await GetByIdAsync(updateDto.Id);
            if (userInDb == null)
            {
                throw new ArgumentNullException("User is not found");
            }
            var updatedUser = _mapper.Map<User>(updateDto);
            updatedUser.UpdatedDate = DateTime.UtcNow;
            _userRepository.Update(userInDb, updatedUser);
            await _unitOfWork.CommitAsync();
            return _userRepository.GetDto(updatedUser);
        }

        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await GetByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentNullException("User is not found");
            }
            user.DeletedDate = DateTime.UtcNow;
            _userRepository.Update(user, user);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteRangeUserAsync(List<Guid> userIds)
        {
            var users = new List<User>();
            foreach (var userId in userIds)
            {
                var user = await GetByIdAsync(userId);
                user.DeletedDate = DateTime.UtcNow;
                users.Add(user);
            }
            _userRepository.UpdateRange(users);
            await _unitOfWork.CommitAsync();
        }
    }
}
