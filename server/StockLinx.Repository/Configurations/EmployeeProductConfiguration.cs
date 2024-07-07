using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class EmployeeProductConfiguration : IEntityTypeConfiguration<EmployeeProduct>
    {
        public void Configure(EntityTypeBuilder<EmployeeProduct> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Quantity).HasDefaultValue(1);

            builder
                .HasOne(x => x.Employee)
                .WithMany(x => x.EmployeeProducts)
                .HasForeignKey(x => x.EmployeeId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Accessory)
                .WithMany(x => x.EmployeeProducts)
                .HasForeignKey(x => x.AccessoryId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Asset)
                .WithMany(x => x.EmployeeProducts)
                .HasForeignKey(x => x.AssetId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Consumable)
                .WithMany(x => x.EmployeeProducts)
                .HasForeignKey(x => x.ConsumableId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.License)
                .WithMany(x => x.EmployeeProducts)
                .HasForeignKey(x => x.LicenseId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
