using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;
using StockLinx.Repository;
using System.Text;

namespace StockLinx.Service.Services
{
    public class FilterService<T> : AppDbContext, IFilterService<T> where T : class
    {
        private readonly AppDbContext _context;
        public FilterService(DbContextOptions options) : base(options)
        {
            _context = new AppDbContext(options);
        }

        public async Task<IEnumerable<T>> FilterAsync(string filterQuery)
        {
            IQueryable<T> query = _context.Set<T>();
            if (string.IsNullOrEmpty(filterQuery))
                return await query.ToListAsync();
            query = query.ApplyFilters(filterQuery);
            return await query.ToListAsync();
        }
    }
}