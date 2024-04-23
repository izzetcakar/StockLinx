namespace StockLinx.Core.DTOs.Generic
{
    public class ConsumableDto : BaseProductDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? SupplierId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
        public int Quantity { get; set; }
        public int AvailableQuantity { get; set; }
    }
}
