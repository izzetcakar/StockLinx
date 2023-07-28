﻿namespace StockLinx.Core.Entities
{
    public class Department : BaseEntity
    {
        public Guid? CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Notes { get; set; }
        public Company? Company { get; set; }
        public Location? Location { get; set; }
        public User? Manager { get; set; }

        //Relates
        public ICollection<User> Users { get; set; }
    }
}
