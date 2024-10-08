﻿namespace StockLinx.Core.Entities
{
    public class Accessory : BaseProduct
    {
        public Guid? CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ImagePath { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }

        //Relates
        public Manufacturer? Manufacturer { get; set; }
        public Category? Category { get; set; }
        public ICollection<EmployeeProduct>? EmployeeProducts { get; set; }
    }
}
