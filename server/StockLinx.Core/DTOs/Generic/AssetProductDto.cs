namespace StockLinx.Core.DTOs.Generic
{
    public class AssetProductDto : BaseDto
    {
        public Guid AssetId { get; init; }
        public Guid? ComponentId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; init; }
        public string ProductType { get; set; }
        public string ProductTag { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
