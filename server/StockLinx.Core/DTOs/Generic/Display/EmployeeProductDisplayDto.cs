namespace StockLinx.Core.DTOs.Generic.Display
{
    public class EmployeeProductDisplayDto
    {
        public string Employee { get; set; }
        public string Product { get; set; }
        public string Seat { get; set; }
        public int Quantity { get; set; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
    }
}
