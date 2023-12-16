namespace StockLinx.Core.DTOs.Generic
{
    public class CustomLogDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
        public string Action { get; set; }
        public string ItemId { get; set; }
        public string ItemRoute { get; set; }
        public string ItemName { get; set; }
        public string? TargetId { get; set; }
        public string? TargetName { get; set; }
        public string? TargetRoute { get; set; }
        public string ItemController { get; set; }
        public string? TargetController { get; set; }
    }
}
