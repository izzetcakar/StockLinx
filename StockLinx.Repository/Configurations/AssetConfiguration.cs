﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using StockLinx.Core.Models;

namespace StockLinx.Repository.Configurations
{
    public class AssetConfiguration : IEntityTypeConfiguration<Asset>
    {
        public void Configure(EntityTypeBuilder<Asset> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Status).HasDefaultValue(Status.Deployable);
            builder.Property(x => x.CheckinCounter).HasDefaultValue(0);
            builder.Property(x => x.CheckoutCounter).HasDefaultValue(0);
            builder.Property(x => x.Name).IsRequired();
            builder.Property(x => x.Quantity).IsRequired().HasDefaultValue(1);

            builder.HasOne(x => x.Model).WithMany(x => x.Assets).HasForeignKey(x => x.ModelId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Manufacturer).WithMany(x => x.Assets).HasForeignKey(x => x.ManufacturerId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Category).WithMany(x => x.Assets).HasForeignKey(x => x.CategoryId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Company).WithMany(x => x.Assets).HasForeignKey(x => x.CompanyId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Image).WithMany(x => x.Assets).HasForeignKey(x => x.ImageId).OnDelete(DeleteBehavior.SetNull);
            builder.HasOne(x => x.Location).WithMany(x => x.Assets).HasForeignKey(x => x.LocationId).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
