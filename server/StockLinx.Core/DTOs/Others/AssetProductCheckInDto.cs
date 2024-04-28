namespace StockLinx.Core.DTOs.Others
{
    public class AssetProductCheckInDto
    {
        public Guid AssetId { get; set; }
        public Guid ProductId { get; set; }
        public DateTime AssignDate { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
    }
}
