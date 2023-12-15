using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IUserService : IService<User>
    {
        Task<UserDto> GetDto(Guid id);
        Task<List<UserDto>> GetAllDtos();
        Task<User> Login(UserLoginDto userLoginDto);
        Guid GetIdByToken();
        Task<User> GetCurrentUser();
        Task<UserDto> CreateUserAsync(UserCreateDto createDto);
        Task<List<UserDto>> CreateRangeUserAsync(List<UserCreateDto> createDtos);
        Task<UserDto> UpdateUserAsync(UserUpdateDto updateDto);
        Task DeleteUserAsync(Guid userId);
        Task DeleteRangeUserAsync(List<Guid> userIds);
    }
}
