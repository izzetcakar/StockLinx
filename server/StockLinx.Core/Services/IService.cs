using System.Linq.Expressions;

namespace StockLinx.Core.Services
{
    public interface IService<T> where T : class
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> Where(Expression<Func<T, bool>> expression);
        Task<bool> AnyAsync(Expression<Func<T, bool>> expression);
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        Task UpdateAsync(T oldEntity, T newEntity);
        Task RemoveRangeAsync(IEnumerable<T> entities);
        Task RemoveAsync(T entity);
    }
}
