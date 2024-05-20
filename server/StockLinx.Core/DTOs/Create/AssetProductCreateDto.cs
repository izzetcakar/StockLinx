namespace StockLinx.Core.DTOs.Create
{
    public class AssetProductCreateDto : BaseCreateDto
    {
        public Guid AssetId { get; init; }
        public Guid? ComponentId { get; init; }
        public Guid? LicenseId { get; init; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
