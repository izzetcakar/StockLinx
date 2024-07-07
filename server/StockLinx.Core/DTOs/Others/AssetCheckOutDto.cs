namespace StockLinx.Core.DTOs.Others
{
    public class AssetCheckOutDto
    {
        public Guid? EmployeeId { get; set; }
        public Guid EmployeeProductId { get; set; }
        public Guid ProductStatusId { get; set; }
        public string? Notes { get; set; }
    }
}
