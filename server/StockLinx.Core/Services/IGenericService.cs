using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IGenericService : IService<User>
    {
        Task CreateBaseEntities();
        Task ClearBaseEntities();
        Task<IEnumerable<ProductStatusCounter>> GetProductStatusCounts();
        Task<IEnumerable<EntityCounter>> GetEntityCounts();
        Task<IEnumerable<ProductCompanyCounterDto>> GetProductCompanyCounts();
        IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts();
    }
}
