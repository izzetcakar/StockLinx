namespace StockLinx.Core.Entities
{
    public class Branch : BaseEntity
    {
        public Guid CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public string Name { get; set; }

        //Relates
        public Company Company { get; set; }
        public Location? Location { get; set; }
        public ICollection<Asset>? Assets { get; set; }
        public ICollection<Accessory>? Accessories { get; set; }
        public ICollection<Component>? Components { get; set; }
        public ICollection<Consumable>? Consumables { get; set; }
        public ICollection<License>? Licenses { get; set; }
        public ICollection<Department>? Departments { get; set; }
        public ICollection<ProductStatus>? ProductStatuses { get; set; }
        public ICollection<Manufacturer>? Manufacturers { get; set; }
        public ICollection<Category>? Categories { get; set; }
        public ICollection<Model>? Models { get; set; }
        public ICollection<Supplier>? Suppliers { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}
