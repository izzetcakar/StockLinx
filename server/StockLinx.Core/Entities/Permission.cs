namespace StockLinx.Core.Entities
{
    public class Permission : BaseEntity
    {
        public Guid BranchId { get; set; }
        public Guid UserId { get; set; }

        //Relates
        public Branch Branch { get; set; }
        public User User { get; set; }
    }
}
