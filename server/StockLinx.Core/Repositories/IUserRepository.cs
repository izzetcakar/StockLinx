using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{

    public interface IUserRepository : IRepository<User>
    {
        Task<User> Login(UserLoginDto userLoginDto);
        Task Logout();
        Task<User> Register(User user);
        string GetMyName();
    }


}
