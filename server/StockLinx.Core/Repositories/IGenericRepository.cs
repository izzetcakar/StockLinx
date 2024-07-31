using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;

namespace StockLinx.Core.Repositories
{
    public interface IGenericRepository : IRepository<User>
    {
        void CreateBaseEntities();
        void ClearBaseEntities();
        Task<IEnumerable<ProductStatusCounter>> GetProductStatusCounts();
        Task<IEnumerable<EntityCounter>> GetEntityCounts();
        Task<IEnumerable<ProductCompanyCounterDto>> GetProductCompanyCounts();
        IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts();
    }
}
