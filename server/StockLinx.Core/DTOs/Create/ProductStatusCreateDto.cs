using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Create
{
    public class ProductStatusCreateDto : BaseCreateDto
    {
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }
    }
}
