using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class ComponentConfiguration : IEntityTypeConfiguration<Component>
    {
        public void Configure(EntityTypeBuilder<Component> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Quantity).IsRequired().HasDefaultValue(1);

            builder.HasOne(x => x.Category).WithMany(x => x.Components).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Company).WithMany(x => x.Components).HasForeignKey(x => x.CompanyId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Location).WithMany(x => x.Components).HasForeignKey(x => x.LocationId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
