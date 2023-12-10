using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class CustomLogConfiguration : IEntityTypeConfiguration<CustomLog>
    {
        public void Configure(EntityTypeBuilder<CustomLog> builder)
        {
            builder.HasKey(e => e.Id);
            builder.Property(e => e.Action).IsRequired();
            builder.Property(e => e.UserId).IsRequired();
            builder.Property(e => e.ItemId).IsRequired();
            builder.Property(e => e.ItemController).IsRequired();
            builder.Property(e => e.Date).IsRequired();
        }
    }
}
