using StockLinx.Core.Entities;

namespace StockLinx.Core.Services
{
    public interface IFilterService<T> where T : class
    {
        Task<IEnumerable<T>> FilterAsync(List<Filter> filters);
    }
}
