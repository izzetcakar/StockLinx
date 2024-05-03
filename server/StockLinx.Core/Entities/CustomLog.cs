namespace StockLinx.Core.Entities
{
    public class CustomLog
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ItemId { get; set; }
        public Guid? TargetId { get; set; }
        public DateTime Date { get; set; }
        public string Item { get; set; }
        public string? Target { get; set; }
        public string ItemController { get; set; }
        public string? TargetController { get; set; }
        public string Action { get; set; }
        public string? Notes { get; set; }
    }
}
