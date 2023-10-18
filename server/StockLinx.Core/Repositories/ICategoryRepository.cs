using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<List<ProductCategoryCounterDto>> GetCounts();
    }
}
