namespace StockLinx.Core.DTOs.Others
{
    public class AssetProductCheckOutDto
    {
        public Guid AssetProductId { get; init; }
        public Guid ProductId { get; init; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
