using StockLinx.Core.DTOs.Create;

namespace StockLinx.Core.DTOs.Update
{
    public class AccessoryUpdateDto : BaseProductUpdateDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public int Quantity { get; set; }
        public DateTime? WarrantyDate { get; set; }
    }
}
