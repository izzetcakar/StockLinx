using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class AccessoryCreateDto : BaseProductCreateDto
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public int? Warranty { get; set; }
    }
}
