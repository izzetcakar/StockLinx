using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class UserProductConfiguration : IEntityTypeConfiguration<UserProduct>
    {
        public void Configure(EntityTypeBuilder<UserProduct> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Quantity).HasDefaultValue(1);

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.UserProducts)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Accessory)
                .WithMany(x => x.UserProducts)
                .HasForeignKey(x => x.AccessoryId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Asset)
                .WithMany(x => x.UserProducts)
                .HasForeignKey(x => x.AssetId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Consumable)
                .WithMany(x => x.UserProducts)
                .HasForeignKey(x => x.ConsumableId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.License)
                .WithMany(x => x.UserProducts)
                .HasForeignKey(x => x.LicenseId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
