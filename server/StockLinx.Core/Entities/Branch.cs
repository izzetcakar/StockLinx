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
        public ICollection<Permission>? Permissions { get; set; }
        public ICollection<Department>? Departments { get; set; }
    }
}
