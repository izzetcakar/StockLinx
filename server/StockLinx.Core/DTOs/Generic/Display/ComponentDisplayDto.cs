namespace StockLinx.Core.DTOs.Generic.Display
{
    public class ComponentDisplayDto : BaseProductDisplayDto
    {
        public string? Category { get; set; }
        public string? SerialNo { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
    }
}
