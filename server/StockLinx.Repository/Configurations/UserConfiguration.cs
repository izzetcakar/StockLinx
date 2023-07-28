using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Email).IsRequired();
            builder.Property(x => x.Password).IsRequired();
            builder.Property(x => x.FirstName).IsRequired();
            builder.Property(x => x.LastName).IsRequired();

            builder.HasOne(x => x.Company).WithMany(x => x.Users).HasForeignKey(x => x.CompanyId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Location).WithMany(x => x.Users).HasForeignKey(x => x.LocationId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Department).WithMany(x => x.Users).HasForeignKey(x => x.LocationId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
