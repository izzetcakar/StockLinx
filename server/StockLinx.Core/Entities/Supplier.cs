﻿namespace StockLinx.Core.Entities
{
    public class Supplier : BaseEntity
    {
        public Guid? ImageId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? ContactName { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Url { get; set; }
        public string? Notes { get; set; }
        public Image? Image { get; set; }
        public Location? Location { get; set; }

        //Relates
        public ICollection<Accessory> Accessories { get; set; }
    }
}
