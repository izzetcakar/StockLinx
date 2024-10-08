﻿namespace StockLinx.Core.Entities
{
    public class Department : BaseEntity
    {
        public Guid CompanyId { get; init; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? Notes { get; set; }

        //Relates
        public Company Company { get; init; }
        public Location? Location { get; set; }
        public ICollection<Employee>? Employees { get; set; }
    }
}
