using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class CustomFieldConfiguration : IEntityTypeConfiguration<CustomField>
    {
        public void Configure(EntityTypeBuilder<CustomField> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Type).IsRequired();
            builder.Property(x => x.IsRequired).IsRequired().HasDefaultValue(false);
            builder.HasOne(x => x.FieldSet).WithMany(x => x.CustomFields).HasForeignKey(x => x.FieldSetId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
