namespace StockLinx.Core.DTOs.Create
{
    public class AssetProductCreateDto : BaseCreateDto
    {
        public Guid AssetId { get; set; }
        public Guid? ComponentId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
