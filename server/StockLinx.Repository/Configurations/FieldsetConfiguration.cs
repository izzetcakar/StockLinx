using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class FieldsetConfiguration : IEntityTypeConfiguration<FieldSet>
    {
        public void Configure(EntityTypeBuilder<FieldSet> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();
            builder.HasOne(x => x.Model).WithOne(x => x.FieldSet).HasForeignKey<FieldSet>(x => x.ModelId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
