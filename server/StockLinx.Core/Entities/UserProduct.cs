namespace StockLinx.Core.Entities
{
    public class UserProduct : BaseEntity
    {
        public Guid UserId { get; init; }
        public Guid? AccessoryId { get; init; }
        public Guid? AssetId { get; init; }
        public Guid? ConsumableId { get; init; }
        public Guid? LicenseId { get; init; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
        public User User { get; init; }
        public Accessory? Accessory { get; init; }
        public Asset? Asset { get; init; }
        public Consumable? Consumable { get; init; }
        public License? License { get; init; }
    }
}
