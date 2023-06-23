using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Update
{
    public class AssetUpdateDto : BaseProductUpdateDto
    {
        public Guid? ModelId { get; set; }
        public int? Tag { get; set; }
        public Status? Status { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
    }
}
