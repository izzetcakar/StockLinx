namespace StockLinx.Core.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }

        //Relates
        public ICollection<Model>? Models { get; set; }
        public ICollection<Accessory>? Accessories { get; set; }
        public ICollection<Component>? Components { get; set; }
        public ICollection<Consumable>? Consumables { get; set; }
        public ICollection<License>? Licenses { get; set; }
    }
}
