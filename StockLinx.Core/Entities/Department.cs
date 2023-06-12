using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Department : BaseEntity
    {
        public string Name { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public Guid? ImageId { get; set; }
        public string? Notes { get; set; }
        public Company? Company { get; set; }
        public Location? Location { get; set; }
        public User? Manager { get; set; }
        public Image? Image { get; set; }

        //Relates
        public ICollection<User> Users { get; set; }
    }
}
