using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class ConsumableCreateDto : BaseProductCreateDto
    {
        public int? Tag { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
    }
}
