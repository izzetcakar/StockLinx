namespace StockLinx.Core.DTOs.Generic
{
    public class AccessoryDto : BaseProductDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ImagePath { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
    }
}
