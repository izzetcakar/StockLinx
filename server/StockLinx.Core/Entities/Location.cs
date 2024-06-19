namespace StockLinx.Core.Entities
{
    public class Location : BaseEntity
    {
        public string Name { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? Address { get; set; }
        public string? Address2 { get; set; }
        public string? ZipCode { get; set; }
        public string? Currency { get; set; }
        public string? Notes { get; set; }

        //Relates
        public ICollection<Company>? Companies { get; set; }
        public ICollection<Department>? Departments { get; set; }
        public ICollection<Supplier>? Suppliers { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}
