namespace StockLinx.Core.DTOs.Generic.Display
{
    public class LicenseProductDisplayDto
    {
        public string Owner { get; set; }
        public string License { get; set; }
        public string Seat { get; set; }
        public int Quantity { get; set; }
        public DateTime AssignDate { get; init; }
        public string? Notes { get; set; }
    }
}
