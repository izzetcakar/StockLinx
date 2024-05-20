namespace StockLinx.Core.DTOs.Others
{
    public class UserProductCheckOutDto
    {
        public Guid UserProductId { get; init; }
        public Guid ProductId { get; init; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
