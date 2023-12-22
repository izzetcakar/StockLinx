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
            builder.Property(x => x.CheckinCounter).HasDefaultValue(0);
            builder.Property(x => x.CheckoutCounter).HasDefaultValue(0);
            builder.Property(x => x.Name).IsRequired();

            builder.HasOne(x => x.Model).WithMany(x => x.Assets).HasForeignKey(x => x.ModelId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Branch).WithMany(x => x.Assets).HasForeignKey(x => x.BranchId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.ProductStatus).WithMany(x => x.Assets).HasForeignKey(x => x.ProductStatusId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
