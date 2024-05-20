namespace StockLinx.Core.DTOs.Create
{
    public class UserProductCreateDto : BaseCreateDto
    {
        public Guid UserId { get; init; }
        public Guid? AccessoryId { get; init; }
        public Guid? AssetId { get; init; }
        public Guid? ConsumableId { get; init; }
        public Guid? LicenseId { get; init; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
