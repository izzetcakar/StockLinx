namespace StockLinx.Core.DTOs.Update
{
    public class ConsumableUpdateDto : BaseProductUpdateDto
    {
        public int? Tag { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }
    }
}
