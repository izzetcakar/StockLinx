using StockLinx.Core.DTOs.Others;
using StockLinx.Core.DTOs.Update;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IUserService : IService<User>
    {
        Task<User> Login(UserLoginDto userLoginDto);
        Task Logout();
        Task<User> Register(User user);
        string GetMyName();
        Task UpdateUserAsync(UserUpdateDto updateDto);
        Task DeleteUserAsync(Guid userId);
    }
}
