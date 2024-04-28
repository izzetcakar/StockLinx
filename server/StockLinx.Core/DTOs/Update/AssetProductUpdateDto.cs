namespace StockLinx.Core.DTOs.Update
{
    public class AssetProductUpdateDto : BaseUpdateDto
    {
        public Guid AssetId { get; set; }
        public Guid? ComponentId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
