namespace StockLinx.Core.DTOs.Others
{
    public class AssetCheckOutDto
    {
        public Guid AssetId { get; set; }
        public Guid UserProductId { get; set; }
        public Guid ProductStatusId { get; set; }
        public string? Notes { get; set; }
    }
}
