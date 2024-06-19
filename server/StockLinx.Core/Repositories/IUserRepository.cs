using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{

    public interface IUserRepository : IRepository<User>
    {
        Task<UserDto> GetDtoAsync(User entity);
        Task<List<UserDto>> GetDtosAsync(List<User> entities);
        Task<List<UserDto>> GetAllDtosAsync();
        Task<bool> CanDeleteAsync(Guid id);
    }
}
