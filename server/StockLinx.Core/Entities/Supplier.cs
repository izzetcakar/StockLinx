﻿namespace StockLinx.Core.Entities
{
    public class Supplier : BaseEntity
    {
        public Guid BranchId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ContactName { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? Website { get; set; }
        public string? Fax { get; set; }
        public string? Notes { get; set; }

        //Relates
        public Branch Branch { get; set; }
        public Location? Location { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
    }
}
