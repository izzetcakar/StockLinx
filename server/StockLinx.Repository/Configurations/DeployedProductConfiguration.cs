using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class DeployedProductConfiguration : IEntityTypeConfiguration<DeployedProduct>
    {
        public void Configure(EntityTypeBuilder<DeployedProduct> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.User).WithMany(x => x.DeployedProducts).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Accessory).WithMany(x => x.DeployedProducts).HasForeignKey(x => x.AccessoryId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Asset).WithMany(x => x.DeployedProducts).HasForeignKey(x => x.AssetId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Component).WithMany(x => x.DeployedProducts).HasForeignKey(x => x.ComponentId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Consumable).WithMany(x => x.DeployedProducts).HasForeignKey(x => x.ConsumableId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.License).WithMany(x => x.DeployedProducts).HasForeignKey(x => x.LicenseId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
