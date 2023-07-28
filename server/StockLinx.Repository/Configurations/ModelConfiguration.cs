using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class ModelConfiguration : IEntityTypeConfiguration<Model>
    {
        public void Configure(EntityTypeBuilder<Model> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();

            builder.HasOne(x => x.Manufacturer).WithMany(x => x.Models).HasForeignKey(x => x.ManufacturerId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Category).WithMany(x => x.Models).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
