namespace StockLinx.Core.Entities
{
    public record Permission : BaseRecord
    {
        public Guid BranchId { get; init; }
        public Guid UserId { get; init; }

        //Relates
        public Branch Branch { get; init; }
        public User User { get; init; }
    }
}
