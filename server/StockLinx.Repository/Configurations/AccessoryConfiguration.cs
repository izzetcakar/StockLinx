﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Entities;

namespace StockLinx.Repository.Configurations
{
    public class AccessoryConfiguration : IEntityTypeConfiguration<Accessory>
    {
        public void Configure(EntityTypeBuilder<Accessory> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Quantity).IsRequired().HasDefaultValue(1);

            builder.HasOne(x => x.Category).WithMany(x => x.Accessories).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.Branch).WithMany(x => x.Accessories).HasForeignKey(x => x.BranchId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.Supplier).WithMany(x => x.Accessories).HasForeignKey(x => x.SupplierId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Manufacturer).WithMany(x => x.Accessories).HasForeignKey(x => x.ManufacturerId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
