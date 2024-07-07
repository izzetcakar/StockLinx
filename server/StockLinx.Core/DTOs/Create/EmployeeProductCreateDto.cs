namespace StockLinx.Core.DTOs.Create
{
    public class EmployeeProductCreateDto : BaseCreateDto
    {
        public Guid EmployeeId { get; init; }
        public Guid? AccessoryId { get; init; }
        public Guid? AssetId { get; init; }
        public Guid? ConsumableId { get; init; }
        public Guid? LicenseId { get; init; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
        public int Quantity { get; set; }
    }
}
