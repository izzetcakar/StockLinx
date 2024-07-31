namespace StockLinx.Core.Entities
{
    public class Company : BaseEntity
    {
        public Guid? LocationId { get; set; }
        public string Tag { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }

        //Relates
        public Location? Location { get; set; }
        public ICollection<Permission>? Permissions { get; set; }
        public ICollection<Department>? Departments { get; set; }
        public ICollection<Asset>? Assets { get; set; }
        public ICollection<License>? Licenses { get; set; }
        public ICollection<Consumable>? Consumables { get; set; }
        public ICollection<Component>? Components { get; set; }
        public ICollection<Accessory>? Accessories { get; set; }
    }
}
