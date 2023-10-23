using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Update
{
    public class ProductStatusUpdateDto : BaseUpdateDto
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }
    }
}
