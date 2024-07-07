using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IUserService : IService<User>
    {
        Task<UserDto> GetDtoAsync(Guid id);
        Task<List<UserDto>> GetAllDtosAsync();
        Task<User> Login(UserLoginDto loginDto);
        Guid GetIdByToken();
        Task<User> GetCurrentUser();
        Task<UserDto> CreateUserAsync(UserCreateDto dto);
        Task<List<UserDto>> CreateRangeUserAsync(List<UserCreateDto> dtos);
        Task<UserDto> UpdateUserAsync(UserUpdateDto dto);
        Task DeleteUserAsync(Guid id);
        Task DeleteRangeUserAsync(List<Guid> ids);
        Task<List<UserDto>> FilterAllAsync(string filter);
        Task<bool> CheckCurrentUserAdmin();
    }
}
