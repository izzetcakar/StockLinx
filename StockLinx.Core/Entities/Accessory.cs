﻿namespace StockLinx.Core.Entities
{
    public class Accessory : BaseProduct
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public int? Warranty { get; set; }
        public Manufacturer? Manufacturer { get; set; }
        public Supplier? Supplier { get; set; }

        //Relates
        public ICollection<DeployedProduct>? DeployedProducts { get; set;}
    }
}
