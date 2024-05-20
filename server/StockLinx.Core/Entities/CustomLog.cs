namespace StockLinx.Core.Entities
{
    public record CustomLog
    {
        public Guid Id { get; init; }
        public Guid UserId { get; init; }
        public Guid ItemId { get; init; }
        public Guid? TargetId { get; init; }
        public DateTime Date { get; init; }
        public string Item { get; init; }
        public string? Target { get; init; }
        public string ItemController { get; init; }
        public string? TargetController { get; init; }
        public string Action { get; init; }
        public string? Notes { get; init; }
    }
}
