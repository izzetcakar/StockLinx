using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IGenericService : IService<User>
    {
        IEnumerable<ProductStatusCounter> GetProductStatusCounts();
        IEnumerable<EntityCounter> GetEntityCounts();
        IEnumerable<ProductLocationCounterDto> GetProductLocationCounts();
        IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts();
    }
}
