using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{

    public interface IUserRepository : IRepository<User>
    {
        UserDto GetDto(User entity);
        List<UserDto> GetDtos(List<User> entities);
        Task<List<UserDto>> GetAllDtosAsync();
        Task<bool> CanDeleteAsync(Guid id);
    }
}
