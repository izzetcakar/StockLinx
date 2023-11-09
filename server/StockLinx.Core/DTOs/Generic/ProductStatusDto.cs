using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class ProductStatusDto : BaseDto
    {
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }
    }
}
