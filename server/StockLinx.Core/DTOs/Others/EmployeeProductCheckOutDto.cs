namespace StockLinx.Core.DTOs.Others
{
    public class EmployeeProductCheckOutDto
    {
        public Guid? EmployeeId { get; init; }
        public Guid EmployeeProductId { get; init; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
