﻿namespace StockLinx.Core.Entities
{
    public class Consumable : BaseProduct
    {
        public Guid CategoryId { get; set; }
        public Guid? SupplierId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
        public int Quantity { get; set; }

        //Relates
        public Category Category { get; set; }
        public Supplier? Supplier { get; set; }
        public Manufacturer? Manufacturer { get; set; }
        public ICollection<DeployedProduct> DeployedProducts { get; set; }
    }
}
