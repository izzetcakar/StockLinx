using Microsoft.EntityFrameworkCore;
using StockLinx.Core.Entities;
using System.Reflection;

namespace StockLinx.Repository
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Accessory> Accessories { get; set; }
        public DbSet<Asset> Assets { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Component> Components { get; set; }
        public DbSet<Consumable> Consumables { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<DeployedProduct> DeployedProducts { get; set; }
        public DbSet<License> Licenses { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
