using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class CompanyConfiguration : IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();

            builder
                .HasOne(x => x.Location)
                .WithMany(x => x.Companies)
                .HasForeignKey(x => x.LocationId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
