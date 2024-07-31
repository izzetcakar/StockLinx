using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class AssetConfiguration : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Tag).IsRequired().HasMaxLength(10);
            builder.HasIndex(x => x.Tag).IsUnique();
            builder.Property(x => x.Name).IsRequired();

            builder
                .HasOne(x => x.Company)
                .WithMany(x => x.Assets)
                .HasForeignKey(x => x.CompanyId);
            builder
                .HasOne(x => x.ProductStatus)
                .WithMany(x => x.Assets)
                .HasForeignKey(x => x.ProductStatusId);
            builder
                .HasOne(x => x.Model)
                .WithMany(x => x.Assets)
                .HasForeignKey(x => x.ModelId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
