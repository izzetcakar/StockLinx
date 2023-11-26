using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{

    public interface IUserRepository : IRepository<User>
    {
        UserDto GetUserDto(User user);
        List<UserDto> GetUserDtos(List<User> users);
        Task<List<UserDto>> GetAllUserDtos();
    }
}
