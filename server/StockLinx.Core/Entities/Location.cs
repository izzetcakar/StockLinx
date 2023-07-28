namespace StockLinx.Core.Entities
{
    public class Location : BaseEntity
    {
        public string? ImagePath { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string? State { get; set; }
        public string? Address { get; set; }
        public string? Address2 { get; set; }
        public string? ZipCode { get; set; }
        public string? Currency { get; set; }
        public string? Notes { get; set; }

        //Relates
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Component> Components { get; set; }
        public ICollection<Consumable> Consumables { get; set; }
        public ICollection<License> Licenses { get; set; }
        public ICollection<Department> Departments { get; set; }
        public ICollection<Supplier> Suppliers { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
