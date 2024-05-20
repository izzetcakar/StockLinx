namespace StockLinx.Core.DTOs.Generic
{
    public class AssetProductDto : BaseDto
    {
        public Guid AssetId { get; init; }
        public Guid ProductId { get; set; }
        public DateTime AssignDate { get; init; }
        public string ProductName { get; set; }
        public string ProductType { get; set; }
        public string ProductRoute { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
