using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IGenericRepository : IRepository<User>
    {
        void CreateBaseEntities();
        void ClearBaseEntities();
        IEnumerable<ProductStatusCounter> GetProductStatusCounts();
        IEnumerable<EntityCounter> GetEntityCounts();
        IEnumerable<ProductLocationCounterDto> GetProductLocationCounts();
        IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts();
    }
}
