namespace StockLinx.Core.DTOs.Update
{
    public class AccessoryUpdateDto : BaseProductUpdateDto
    {
        public Guid CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
    }
}
