using System.Security.Claims;
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
using StockLinx.Repository.Repositories.EF_Core;

namespace StockLinx.Service.Services
{
    public class UserService : Service<User>, IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly ICustomLogService _customLogService;
        private readonly IFilterService<User> _filterService;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(
            IRepository<User> repository,
            IUserRepository userRepository,
            IDepartmentRepository departmentRepository,
            IHttpContextAccessor httpContextAccessor,
            ICustomLogService customLogService,
            IFilterService<User> filterService,
            IMapper mapper,
            IUnitOfWork unitOfWork
        )
            : base(repository, unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
            _departmentRepository = departmentRepository;
            _customLogService = customLogService;
            _filterService = filterService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<UserDto> GetDtoAsync(Guid id)
        {
            User user = await GetByIdAsync(id);
            return await _userRepository.GetDtoAsync(user);
        }

        public async Task<List<UserDto>> GetAllDtosAsync()
        {
            return await _userRepository.GetAllDtosAsync();
        }

        public Guid GetIdByToken()
        {
            if (_httpContextAccessor.HttpContext != null)
            {
                string idString = _httpContextAccessor.HttpContext.User.FindFirst("UserId").Value;
                if (Guid.TryParse(idString, out Guid idGuid))
                {
                    return idGuid;
                }
                else
                {
                    throw new FormatException("Invalid Id format");
                }
            }
            else
            {
                throw new NotImplementedException("Invalid Token");
            }
        }

        public async Task<User> GetCurrentUser()
        {
            Guid id = GetIdByToken();
            return await GetByIdAsync(id);
        }

        public async Task<User> Login(UserLoginDto userLoginDto)
        {
            var user = await _userRepository
                .Where(x => x.Email == userLoginDto.Email && x.Password == userLoginDto.Password)
                .SingleOrDefaultAsync();
            if (user == null)
            {
                throw new Exception("User is not found");
            }
            return user;
        }

        public async Task<UserDto> CreateUserAsync(UserCreateDto dto)
        {
            User user = _mapper.Map<User>(dto);
            Department department = await _departmentRepository.GetByIdAsync(dto.DepartmentId);
            bool employeeNoExist = await _userRepository.AnyAsync(x =>
                x.EmployeeNo == user.EmployeeNo
            );
            if (employeeNoExist)
            {
                throw new Exception("EmployeeNo already exists");
            }
            await _userRepository.AddAsync(user);
            await _customLogService.CreateCustomLog(
                "Create",
                "User",
                user.Id,
                user.FirstName + " " + user.LastName,
                "Department",
                department.Id,
                department.Name
            );
            await _unitOfWork.CommitAsync();
            return await _userRepository.GetDtoAsync(user);
        }

        public async Task<List<UserDto>> CreateRangeUserAsync(List<UserCreateDto> dtos)
        {
            List<User> users = new List<User>();
            foreach (UserCreateDto dto in dtos)
            {
                User user = _mapper.Map<User>(dto);
                Department department = await _departmentRepository.GetByIdAsync(dto.DepartmentId);
                bool employeeNoExist = await _userRepository.AnyAsync(x =>
                    x.EmployeeNo == user.EmployeeNo
                );
                if (employeeNoExist)
                {
                    throw new Exception("EmployeeNo already exists");
                }
                users.Add(user);
                await _customLogService.CreateCustomLog(
                    "Create",
                    "User",
                    user.Id,
                    user.FirstName + " " + user.LastName,
                    "Department",
                    department.Id,
                    department.Name
                );
            }
            await _userRepository.AddRangeAsync(users);
            await _unitOfWork.CommitAsync();
            return await _userRepository.GetDtosAsync(users);
        }

        public async Task<UserDto> UpdateUserAsync(UserUpdateDto dto)
        {
            User userInDb = await GetByIdAsync(dto.Id);
            User user = _mapper.Map<User>(dto);
            user.UpdatedDate = DateTime.UtcNow;
            _userRepository.Update(userInDb, user);
            await _customLogService.CreateCustomLog(
                "Update",
                "User",
                user.Id,
                user.FirstName + " " + user.LastName
            );
            await _unitOfWork.CommitAsync();
            return await _userRepository.GetDtoAsync(user);
        }

        public async Task DeleteUserAsync(Guid id)
        {
            User user = await GetByIdAsync(id);
            bool canDelete = await _userRepository.CanDeleteAsync(id);
            if (canDelete)
            {
                await _customLogService.CreateCustomLog(
                    "Delete",
                    "User",
                    user.Id,
                    user.FirstName + " " + user.LastName
                );
                _userRepository.Remove(user);
                await _unitOfWork.CommitAsync();
            }
        }

        public async Task DeleteRangeUserAsync(List<Guid> ids)
        {
            List<User> users = new List<User>();
            foreach (Guid id in ids)
            {
                User user = await GetByIdAsync(id);
                bool canDelete = await _userRepository.CanDeleteAsync(id);
                if (canDelete)
                {
                    users.Add(user);
                    await _customLogService.CreateCustomLog(
                        "Delete",
                        "User",
                        user.Id,
                        user.FirstName + " " + user.LastName
                    );
                }
            }
            _userRepository.RemoveRange(users);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<UserDto>> FilterAllAsync(string filter)
        {
            var result = await _filterService.FilterAsync(filter);
            return await _userRepository.GetDtosAsync(result.ToList());
        }
    }
}
