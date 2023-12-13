namespace StockLinx.Core.DTOs.Generic
{
    public class DeployedProductDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid? AccessoryId { get; set; }
        public Guid? AssetId { get; set; }
        public Guid? ComponentId { get; set; }
        public Guid? ConsumableId { get; set; }
        public Guid? LicenseId { get; set; }
        public string? Notes { get; set; }
        public DateTime AssignDate { get; set; }
        public string? ProductName { get; set; }
        public string? ProductDescription { get; set; }
    }
}
