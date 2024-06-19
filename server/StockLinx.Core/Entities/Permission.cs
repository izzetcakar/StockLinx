namespace StockLinx.Core.Entities
{
    public record Permission : BaseRecord
    {
        public Guid CompanyId { get; init; }
        public Guid UserId { get; init; }

        //Relates
        public Company Company { get; init; }
        public User User { get; init; }
    }
}
