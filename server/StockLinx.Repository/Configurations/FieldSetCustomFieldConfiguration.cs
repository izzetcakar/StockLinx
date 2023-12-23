using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class FieldSetCustomFieldConfiguration : IEntityTypeConfiguration<FieldSetCustomField>
    {
        public void Configure(EntityTypeBuilder<FieldSetCustomField> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.FieldSet).WithMany(x => x.FieldSetCustomFields).HasForeignKey(x => x.FieldSetId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.CustomField).WithMany(x => x.FieldSetCustomFields).HasForeignKey(x => x.CustomFieldId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
