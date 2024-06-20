namespace StockLinx.Core.DTOs.Others
{
    public class AssetProductCheckOutDto
    {
        public Guid? AssetId { get; init; }
        public Guid AssetProductId { get; init; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
