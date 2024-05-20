namespace StockLinx.Core.Entities
{
    public class AssetProduct : BaseEntity
    {
        public Guid AssetId { get; init; }
        public Guid? ComponentId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
        public Asset Asset { get; init; }
        public Component? Component { get; init; }
        public License? License { get; init; }
    }
}
