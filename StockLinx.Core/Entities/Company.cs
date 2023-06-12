using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Company : BaseEntity
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public Image? Image { get; set; }

        //Relates
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Component> Components { get; set; }
        public ICollection<Consumable> Consumables { get; set; }
        public ICollection<License> Licenses { get; set; }
        public ICollection<Department> Departments { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
