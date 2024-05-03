namespace StockLinx.Core.DTOs.Others
{
    public class UserProductCheckOutDto
    {
        public Guid UserProductId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
