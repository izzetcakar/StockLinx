using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class AssetDto : BaseProductDto
    {
        public Guid? ModelId { get; set; }
        public int? Tag { get; set; }
        public Status? Status { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
        public Guid? ManufacturerId { get; set; }
    }
}
