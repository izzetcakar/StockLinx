namespace StockLinx.Core.Entities
{
    public class Company : BaseEntity
    {
        public Guid? LocationId { get; set; }
        public string Tag { get; set; }
        public string Name { get; set; }
        public string? Email { get; set; }
        public string? ImagePath { get; set; }

        //Relates
        public Location? Location { get; set; }
        public ICollection<Permission>? Permissions { get; set; }
        public ICollection<Department>? Departments { get; set; }
    }
}
