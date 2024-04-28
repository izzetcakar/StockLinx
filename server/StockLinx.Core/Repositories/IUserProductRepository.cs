using StockLinx.Core.DTOs.Generic;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IUserProductRepository : IRepository<UserProduct>
    {
        Task<UserProductDto> GetDtoAsync(UserProduct entity);
        Task<List<UserProductDto>> GetDtosAsync(List<UserProduct> entities);
        Task<List<UserProductDto>> GetAllDtosAsync();
    }
}
