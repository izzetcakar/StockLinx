namespace StockLinx.Core.DTOs.Update
{
    public class ConsumableUpdateDto : BaseProductUpdateDto
    {
        public Guid? CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
        public int Quantity { get; set; }
    }
}
