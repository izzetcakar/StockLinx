using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class Repository<T> : IRepository<T>
        where T : class
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

        public async Task<T> GetByIdAsync(Guid id)
        {
            var result = await dbSet.FindAsync(id);
            if (result == null)
            {
                throw new Exception($"{typeof(T).Name} is not found");
            }
            return result;
        }

        public void Remove(T entity)
        {
            T result = dbSet.Find(dbSet.Entry(entity).Property("Id").CurrentValue);
            if (result == null)
            {
                throw new Exception($"{typeof(T).Name} is not found");
            }
            dbSet.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            var result = dbSet.Find(entities);
            if (result == null)
            {
                throw new Exception($"{typeof(T).Name} is not found");
            }
            dbSet.RemoveRange(entities);
        }

        public void Update(T oldEntity, T newEntity)
        {
            T oldE = dbSet.Find(dbSet.Entry(oldEntity).Property("Id").CurrentValue);
            T newE = dbSet.Find(dbSet.Entry(newEntity).Property("Id").CurrentValue);
            if (oldE == null || newE == null)
            {
                throw new Exception($"{typeof(T).Name} is not found");
            }
            dbSet.Entry(oldEntity).CurrentValues.SetValues(newEntity);
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            var result = dbSet.Find(entities);
            if (result == null)
            {
                throw new Exception($"{typeof(T).Name} not found");
            }
            dbSet.UpdateRange(entities);
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> expression)
        {
            return dbSet.Where(expression);
        }
    }
}
