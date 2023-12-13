using Microsoft.EntityFrameworkCore;
using StockLinx.Core.Repositories;
using System.Linq.Expressions;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext dbContext;
        private readonly DbSet<T> dbSet;

        public Repository(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
            dbSet = dbContext.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await dbSet.AddRangeAsync(entities);
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return await dbSet.AnyAsync(expression);
        }

        public IQueryable<T> GetAll()
        {
            return dbSet.AsQueryable().AsNoTracking();
        }

        public async Task<T> GetByIdAsync(Guid? id)
        {
            if (id.HasValue)
            {
                return await dbSet.FindAsync(id.Value);
            }
            return null;
        }

        public void Update(T oldEntity, T newEntity)
        {
            dbSet.Entry(oldEntity).CurrentValues.SetValues(newEntity);
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            dbSet.UpdateRange(entities);
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> expression)
        {
            return dbSet.Where(expression);
        }
    }
}
