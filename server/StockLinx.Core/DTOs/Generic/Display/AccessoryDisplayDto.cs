namespace StockLinx.Core.DTOs.Generic.Display
{
    public class AccessoryDisplayDto : BaseProductDisplayDto
    {
        public string? Category { get; set; }
        public string? Manufacturer { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
    }
}
