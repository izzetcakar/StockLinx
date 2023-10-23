using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Create
{
    public class ProductStatusCreateDto
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }
    }
}
