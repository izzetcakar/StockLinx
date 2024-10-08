﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();

            builder
                .HasOne(x => x.Company)
                .WithMany(x => x.Departments)
                .HasForeignKey(x => x.CompanyId);
            builder
                .HasOne(x => x.Location)
                .WithMany(x => x.Departments)
                .HasForeignKey(x => x.LocationId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
