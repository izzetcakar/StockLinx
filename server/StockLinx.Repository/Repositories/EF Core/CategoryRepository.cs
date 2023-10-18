using Microsoft.EntityFrameworkCore;
using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public Task<List<ProductCategoryCounterDto>> GetCounts()
        {
            var counts = dbContext.Categories
               .Select(x => new ProductCategoryCounterDto
               {
                   CategoryId = x.Id,
                   CategoryName = x.Name,
                   AssetCount = x.Assets.Count,
                   LicenseCount = x.Licenses.Count,
                   AccessoryCount = x.Accessories.Count,
                   ConsumableCount = x.Consumables.Count,
                   ComponentCount = x.Components.Count,
               }).ToListAsync();

            return counts;
        }
    }
}
