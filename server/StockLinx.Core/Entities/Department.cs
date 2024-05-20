namespace StockLinx.Core.Entities
{
    public class Department : BaseEntity
    {
        public Guid BranchId { get; init; }
        public Guid? LocationId { get; set; }
        public Guid? ManagerId { get; set; }
        public string Name { get; set; }
        public string? Notes { get; set; }

        //Relates
        public Branch Branch { get; init; }
        public Location? Location { get; set; }
        public ICollection<User>? Users { get; set; }
    }
}
