using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.HasKey(x => x.Id);

            builder
                .HasOne(x => x.Company)
                .WithMany(x => x.Permissions)
                .HasForeignKey(x => x.CompanyId);
            builder.HasOne(x => x.User).WithMany(x => x.Permissions).HasForeignKey(x => x.UserId);
        }
    }
}
