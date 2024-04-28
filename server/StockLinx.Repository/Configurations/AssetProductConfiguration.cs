using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class AssetProductConfiguration : IEntityTypeConfiguration<AssetProduct>
    {
        public void Configure(EntityTypeBuilder<AssetProduct> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Quantity).HasDefaultValue(1);

            builder
                .HasOne(x => x.Asset)
                .WithMany(x => x.AssetProducts)
                .HasForeignKey(x => x.AssetId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Component)
                .WithMany(x => x.AssetProducts)
                .HasForeignKey(x => x.ComponentId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.License)
                .WithMany(x => x.AssetProducts)
                .HasForeignKey(x => x.LicenseId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
