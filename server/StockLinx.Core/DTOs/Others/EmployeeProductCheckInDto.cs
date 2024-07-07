namespace StockLinx.Core.DTOs.Others
{
    public class EmployeeProductCheckInDto
    {
        public Guid EmployeeId { get; init; }
        public Guid ProductId { get; init; }
        public DateTime AssignDate { get; init; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
