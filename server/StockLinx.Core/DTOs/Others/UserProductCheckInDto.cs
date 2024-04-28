namespace StockLinx.Core.DTOs.Others
{
    public class UserProductCheckInDto
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime AssignDate { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
