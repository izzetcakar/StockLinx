using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class ModelFieldDataConfiguration : IEntityTypeConfiguration<ModelFieldData>
    {
        public void Configure(EntityTypeBuilder<ModelFieldData> builder)
        {
            builder.HasKey(mfd => mfd.Id);
            builder.Property(mfd => mfd.Value).IsRequired();
            builder.HasOne(mfd => mfd.Model).WithMany(m => m.ModelFieldData).HasForeignKey(mfd => mfd.ModelId);
            builder.HasOne(mfd => mfd.CustomField).WithMany(cf => cf.ModelFieldData).HasForeignKey(mfd => mfd.CustomFieldId);
        }
    }
}
