using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CustomLogRepository : Repository<CustomLog>, ICustomLogRepository
    {
        public CustomLogRepository(AppDbContext dbContext) : base(dbContext)
        {
        }
        public IQueryable<object> GetAllEntities(string entityName)
        {
            var inputEntityName = "StockLinx.Core.Entities." + entityName;
            var entityType = dbContext.Model.FindEntityType(inputEntityName);

            if (entityType != null)
            {
                var setMethod = dbContext.GetType().GetMethod("Set", Type.EmptyTypes).MakeGenericMethod(entityType.ClrType);
                var set = setMethod.Invoke(dbContext, null);

                return set as IQueryable<object>;
            }
            throw new InvalidOperationException($"The entity type '{entityName}' is not found.(GetAll)");
        }

        public object GetObjById(string entityName, Guid id)
        {
            var inputEntityName = "StockLinx.Core.Entities." + entityName;
            var entityType = dbContext.Model.FindEntityType(inputEntityName);

            if (entityType != null)
            {
                var allEntities = GetAllEntities(entityName).ToList();
                var keyName = "Id";
                var entity = allEntities.SingleOrDefault(e => (Guid)e.GetType().GetProperty(keyName).GetValue(e) == id);

                if (entity == null)
                {
                    throw new InvalidOperationException($"Entity with '{keyName}' = '{id}' not found in '{inputEntityName}'.");
                }
                return entity;
            }
            throw new InvalidOperationException($"The entity type '{entityName}' is not found.");
        }
    }
}
