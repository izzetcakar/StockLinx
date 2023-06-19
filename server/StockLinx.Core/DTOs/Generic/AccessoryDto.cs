namespace StockLinx.Core.DTOs.Generic
{
    public class AccessoryDto : BaseProductDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public int? Warranty { get; set; }
    }
}
