namespace StockLinx.Core.DTOs.Others
{
    public class UserProductCheckOutDto
    {
        public Guid? UserId { get; init; }
        public Guid UserProductId { get; init; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
