using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class LicenseConfiguration : IEntityTypeConfiguration<License>
    {
        public void Configure(EntityTypeBuilder<License> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Quantity).IsRequired().HasDefaultValue(1);

            builder.HasOne(x => x.Category).WithMany(x => x.Licenses).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Branch).WithMany(x => x.Licenses).HasForeignKey(x => x.BranchId).OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Supplier).WithMany(x => x.Licenses).HasForeignKey(x => x.SupplierId).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
