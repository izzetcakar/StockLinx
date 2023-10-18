namespace StockLinx.Core.DTOs.Generic
{
    public class AccessoryDto : BaseProductDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
        public DateTime? WarrantyDate { get; set; }
    }
}
