namespace StockLinx.Core.Entities
{
    public class DeployedProduct : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid? AccessoryId { get; set; }
        public Guid? AssetId { get; set; }
        public Guid? ComponentId { get; set; }
        public Guid? ConsumableId { get; set; }
        public Guid? LicenseId { get; set; }
        public Guid? ProductStatusId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
        public User User { get; set; }
        public Accessory? Accessory { get; set; }
        public Asset? Asset { get; set; }
        public Component? Component { get; set; }
        public Consumable? Consumable { get; set; }
        public License? License { get; set; }
        public ProductStatus? ProductStatus { get; set; }
    }
}
