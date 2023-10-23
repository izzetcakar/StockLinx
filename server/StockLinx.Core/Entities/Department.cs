namespace StockLinx.Core.Entities
{
    public class Department : BaseEntity
    {
        public Guid BranchId { get; set; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Notes { get; set; }

        //Relates
        public Branch Branch { get; set; }
        public Location? Location { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
