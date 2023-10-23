using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class ProductStatusConfiguration : IEntityTypeConfiguration<ProductStatus>
    {
        public void Configure(EntityTypeBuilder<ProductStatus> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Type).IsRequired();

            builder.HasOne(x => x.Branch).WithMany(x => x.ProductStatuses).HasForeignKey(x => x.BranchId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
