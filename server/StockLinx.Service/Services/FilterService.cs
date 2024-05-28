using Dapper;
using Microsoft.Extensions.Configuration;
using StockLinx.Core.Entities;
using StockLinx.Core.Services;
using StockLinx.Repository;
using System.Text;

namespace StockLinx.Service.Services
{
    public class FilterService<T> : DapperContext, IFilterService<T> where T : class
    {
        private readonly DapperContext _context;
        public FilterService(IConfiguration configuration) : base(configuration)
        {
            _context = new DapperContext(configuration);
        }

        public async Task<IEnumerable<T>> FilterAsync(List<Filter> filters)
        {
            var query = new StringBuilder();
            var parameters = new DynamicParameters();
            foreach (Filter filter in filters)
            {
                query.Append(FilterExpression.BuildQuery(filter));
                parameters.Add(filter.PropertyName, filter.Value);
            }
            string className = FilterExpression.GetTableNameByClass(typeof(T).Name);
            var sql = $"SELECT * FROM \"{className}\" WHERE 1=1{query}";
            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryAsync<T>(sql);
                return result;
            }
        }
    }
}