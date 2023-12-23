using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class BranchConfiguration : IEntityTypeConfiguration<Branch>
    {
        public void Configure(EntityTypeBuilder<Branch> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Name).IsRequired().HasMaxLength(100);
            builder.HasOne(b => b.Location).WithMany(l => l.Branches).HasForeignKey(b => b.LocationId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(b => b.Company).WithMany(c => c.Branches).HasForeignKey(b => b.CompanyId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
