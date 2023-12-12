using Microsoft.EntityFrameworkCore;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CustomLogRepository : Repository<CustomLog>, ICustomLogRepository
    {
        public CustomLogRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
        public async Task<IQueryable<object>> GetAllEntitiesAsync(string entityName)
        {
            var inputEntityName = "StockLinx.Core.Entities." + entityName;
            var entityType = dbContext.Model.FindEntityType(inputEntityName);

            if (entityType != null)
            {
                var setMethod = dbContext.GetType().GetMethod("Set", Type.EmptyTypes).MakeGenericMethod(entityType.ClrType);
                var set = setMethod.Invoke(dbContext, null);

                // Assuming DbSet<T> has an asynchronous version of ToList, use it.
                var resultList = ((dynamic)set);

                return resultList.AsQueryable();
            }
            throw new InvalidOperationException($"The entity type '{entityName}' is not found.(GetAll)");
        }

        public async Task<string> GetObjByIdAsync(string entityName, Guid id)
        {
            var inputEntityName = "StockLinx.Core.Entities." + entityName;
            var entityType = dbContext.Model.FindEntityType(inputEntityName);

            if (entityType != null)
            {
                var allEntities = await GetAllEntitiesAsync(entityName).Result.ToListAsync();
                var keyName = "Id";
                var entity = allEntities.SingleOrDefault(e => (Guid)e.GetType().GetProperty(keyName).GetValue(e) == id);

                if (entity == null)
                {
                    throw new InvalidOperationException($"Entity with '{keyName}' = '{id}' not found in '{inputEntityName}'.");
                }

                return entity.GetType().GetProperty("Name").GetValue(entity).ToString();
            }
            throw new InvalidOperationException($"The entity type '{entityName}' is not found.");
        }

    }
}
