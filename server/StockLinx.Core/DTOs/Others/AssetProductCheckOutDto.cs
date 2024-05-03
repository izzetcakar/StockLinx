namespace StockLinx.Core.DTOs.Others
{
    public class AssetProductCheckOutDto
    {
        public Guid AssetProductId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
