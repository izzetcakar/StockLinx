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
                var resultList = ((dynamic)set);

                return resultList.AsQueryable();
            }
            throw new InvalidOperationException($"The entity type '{entityName}' is not found in GET_ALL");
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
                if (entity != null)
                {
                    if (entityName == "User")
                    {
                        var firstName = entity?.GetType().GetProperty("FirstName").GetValue(entity);
                        var lastName = entity?.GetType().GetProperty("LastName").GetValue(entity);
                        return $"{firstName} {lastName}";
                    }
                    var nameProperty = entity?.GetType().GetProperty("Name");
                    if (nameProperty != null)
                    {
                        var name = nameProperty.GetValue(entity);
                        if (name != null)
                        {
                            return name.ToString();
                        }
                    }
                    return "ENTITY__NAME__NOT__FOUND";
                }
                else
                {
                    return "ENTITY__NOT__FOUND";
                }
            }
            throw new InvalidOperationException($"The entity type '{entityName}' is not found.");
        }
    }
}
