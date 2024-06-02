using Microsoft.EntityFrameworkCore;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;
using StockLinx.Repository;

namespace StockLinx.Service.Services
{
    public class FilterService<T> : AppDbContext, IFilterService<T>
        where T : class
    {
        private readonly AppDbContext _context;

        public FilterService(DbContextOptions options)
            : base(options)
        {
            _context = new AppDbContext(options);
        }

        public async Task<IEnumerable<T>> FilterAsync(string filterQuery)
        {
            IQueryable<T> query = _context.Set<T>();
            if (string.IsNullOrEmpty(filterQuery))
                return await query.ToListAsync();
            return await query.ApplyFilters(filterQuery).ToListAsync();
        }
    }
}
