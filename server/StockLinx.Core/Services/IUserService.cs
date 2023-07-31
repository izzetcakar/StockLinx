using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IUserService : IService<User>
    {
        Task<User> Login(UserLoginDto userLoginDto);
        Task Logout();
        Task<User> Register(UserCreateDto createUser);
        Guid GetIdByToken();
        Task<User> GetCurrentUser();
        Task UpdateUserAsync(UserUpdateDto updateDto);
        Task DeleteUserAsync(Guid userId);
    }
}
