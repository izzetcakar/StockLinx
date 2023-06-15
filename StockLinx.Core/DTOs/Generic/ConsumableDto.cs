namespace StockLinx.Core.DTOs.Generic
{
    public class ConsumableDto : BaseProductDto
    {
        public int? Tag { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
    }
}
