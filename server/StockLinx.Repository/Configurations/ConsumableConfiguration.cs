using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class ConsumableConfiguration : IEntityTypeConfiguration<Consumable>
    {
        public void Configure(EntityTypeBuilder<Consumable> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Tag).IsRequired().HasMaxLength(10);
            builder.HasIndex(x => x.Tag).IsUnique();
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Quantity).IsRequired().HasDefaultValue(1);

            builder
                .HasOne(x => x.Category)
                .WithMany(x => x.Consumables)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Supplier)
                .WithMany(x => x.Consumables)
                .HasForeignKey(x => x.SupplierId)
                .OnDelete(DeleteBehavior.SetNull);
            builder
                .HasOne(x => x.Manufacturer)
                .WithMany(x => x.Consumables)
                .HasForeignKey(x => x.ManufacturerId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
