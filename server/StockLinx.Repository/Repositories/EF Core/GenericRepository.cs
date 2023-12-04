using StockLinx.Core.DTOs.Others;
using StockLinx.Core.Entities;
using StockLinx.Core.Repositories;

namespace StockLinx.Repository.Repositories.EF_Core
{
    public class GenericRepository : Repository<User>, IGenericRepository
    {
        public GenericRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<EntityCounter> GetEntityCounts()
        {
            var entityCounts = new List<EntityCounter>();
            var accessoryCount = dbContext.Accessories.Count();
            var licenseCount = dbContext.Licenses.Count();
            var consumableCount = dbContext.Consumables.Count();
            var assetCount = dbContext.Assets.Count();
            var componentCount = dbContext.Components.Count();
            var userCount = dbContext.Users.Count();
            entityCounts.Add(new EntityCounter { EntityName = "Accessory", Count = accessoryCount });
            entityCounts.Add(new EntityCounter { EntityName = "License", Count = licenseCount });
            entityCounts.Add(new EntityCounter { EntityName = "Consumable", Count = consumableCount });
            entityCounts.Add(new EntityCounter { EntityName = "Asset", Count = assetCount });
            entityCounts.Add(new EntityCounter { EntityName = "Component", Count = componentCount });
            entityCounts.Add(new EntityCounter { EntityName = "User", Count = userCount });
            return entityCounts;
        }

        public IEnumerable<ProductStatusCounter> GetProductStatusCounts()
        {
            var productStatusCounts = new List<ProductStatusCounter>();
            var assets = dbContext.Assets;
            var productStatuses = dbContext.ProductStatuses;

            productStatusCounts = productStatuses.Select(status => new ProductStatusCounter
            {
                Count = assets.Count(a => a.ProductStatusId == status.Id),
                Status = status.Name
            }).ToList();
            return productStatusCounts;
        }
        public IEnumerable<ProductLocationCounterDto> GetProductLocationCounts()
        {
            var productLocationCounts = new List<ProductLocationCounterDto>();
            var locations = dbContext.Locations;
            var assets = dbContext.Assets;
            var deployedAssets = dbContext.DeployedProducts;
            productLocationCounts = locations.Select(l => new ProductLocationCounterDto
            {
                LocationId = l.Id,
                LocationName = l.Name,
                ProductCount = assets.Where(a => a.Branch.LocationId == l.Id).Count(),
                AssignedCount = deployedAssets.Where(d => d.User.Department.Branch.LocationId == l.Id).Count(),
            }).ToList();
            return productLocationCounts;
        }

        public IEnumerable<ProductCategoryCounterDto> GetProductCategoryCounts()
        {
            var productCategoryCounts = new List<ProductCategoryCounterDto>();
            var assetCount = dbContext.Categories.Where(c => c.Models != null).Select(c => new ProductCategoryCounterDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                ProductName = "Asset",
                ProductCount = c.Models == null ? 0 : c.Models.Count(),
            }).ToList();
            var accessoryCount = dbContext.Categories.Where(c => c.Accessories != null).Select(c => new ProductCategoryCounterDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                ProductName = "Accessory",
                ProductCount = c.Accessories == null ? 0 : c.Accessories.Count(),
            }).ToList();
            var componentCount = dbContext.Categories.Where(c => c.Components != null).Select(c => new ProductCategoryCounterDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                ProductName = "Component",
                ProductCount = c.Components == null ? 0 : c.Components.Count(),
            }).ToList();
            var consumableCount = dbContext.Categories.Where(c => c.Consumables != null).Select(c => new ProductCategoryCounterDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                ProductName = "Consumable",
                ProductCount = c.Consumables == null ? 0 : c.Consumables.Count(),
            }).ToList();
            var licenseCount = dbContext.Categories.Where(c => c.Licenses != null).Select(c => new ProductCategoryCounterDto
            {
                CategoryId = c.Id,
                CategoryName = c.Name,
                ProductName = "License",
                ProductCount = c.Licenses == null ? 0 : c.Licenses.Count(),
            }).ToList();
            return productCategoryCounts.Concat(assetCount).Concat(accessoryCount).Concat(componentCount).Concat(consumableCount).Concat(licenseCount);
        }

    }
}
