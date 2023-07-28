namespace StockLinx.Core.DTOs.Generic
{
    public class ConsumableDto : BaseProductDto
    {
        public int Quantity { get; set; }
        public string? ItemNo { get; set; }
        public string? ModelNo { get; set; }
    }
}
