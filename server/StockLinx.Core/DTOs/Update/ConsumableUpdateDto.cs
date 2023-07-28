namespace StockLinx.Core.DTOs.Update
{
    public class ConsumableUpdateDto : BaseProductUpdateDto
    {
        public int Quantity { get; set; }
        public string? ItemNo { get; set; }
        public string? ModelNo { get; set; }
    }
}
