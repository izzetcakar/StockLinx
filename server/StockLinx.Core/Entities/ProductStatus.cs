﻿namespace StockLinx.Core.Entities
{
    public class ProductStatus : BaseEntity
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }

        // Relates
        public Branch Branch { get; set; }
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Component> Components { get; set; }
        public ICollection<Consumable> Consumables { get; set; }
        public ICollection<License> Licenses { get; set; }
    }
}
