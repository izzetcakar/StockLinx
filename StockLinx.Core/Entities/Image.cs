namespace StockLinx.Core.Entities
{
    public class Image : BaseEntity
    {
        public string Path { get; set; }

        //Relates
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Company> Companies { get; set; }
        public ICollection<Component> Components { get; set; }
        public ICollection<Consumable> Consumables { get; set; }
        public ICollection<Department> Departments { get; set; }
        public ICollection<License> Licenses { get; set; }
        public ICollection<Location> Locations { get; set; }
        public ICollection<Manufacturer> Manufacturers { get; set; }
        public ICollection<Model> Models { get; set; }
        public ICollection<Supplier> Suppliers { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
