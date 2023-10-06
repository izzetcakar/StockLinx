using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Create
{
    public class ConsumableCreateDto : BaseProductCreateDto
    {
        public int Quantity { get; set; }
        public string? ItemNo { get; set; }
        public string? ModelNo { get; set; }
    }
}
