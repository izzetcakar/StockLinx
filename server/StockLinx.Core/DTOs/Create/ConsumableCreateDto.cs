namespace StockLinx.Core.DTOs.Create
{
    public class ConsumableCreateDto : BaseProductCreateDto
    {
        public Guid CategoryId { get; set; }
        public Guid? SupplierId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
        public int Quantity { get; set; }
    }
}
