namespace StockLinx.Core.Entities
{
    public class AssetProduct : BaseEntity
    {
        public Guid AssetId { get; set; }
        public Guid? ComponentId { get; set; }
        public Guid? LicenseId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
        public Asset Asset { get; set; }
        public Component? Component { get; set; }
        public License? License { get; set; }
    }
}
