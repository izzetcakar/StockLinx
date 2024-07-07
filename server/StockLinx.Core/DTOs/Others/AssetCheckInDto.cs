namespace StockLinx.Core.DTOs.Others
{
    public class AssetCheckInDto
    {
        public Guid AssetId { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid ProductStatusId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
    }
}
