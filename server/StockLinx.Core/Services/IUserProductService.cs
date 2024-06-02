using StockLinx.Core.DTOs.Create;
using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IUserProductService : IService<UserProduct>
    {
        Task<UserProductDto> GetDtoAsync(Guid id);
        Task<List<UserProductDto>> GetAllDtosAsync();
        Task<UserProductDto> CreateUserProductAsync(UserProductCreateDto dto);
        Task<List<UserProductDto>> CreateRangeUserProductAsync(List<UserProductCreateDto> dtos);
        Task DeleteUserProductAsync(Guid id);
        Task<List<UserProductDto>> FilterAllAsync(string filter);
    }
}
