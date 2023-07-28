namespace StockLinx.Core.DTOs.Create
{
    public class AccessoryCreateDto : BaseProductCreateDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public int Quantity { get; set; }
        public DateTime? WarrantyDate { get; set; }
    }
}
