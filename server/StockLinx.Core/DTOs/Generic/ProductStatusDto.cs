using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class ProductStatusDto : BaseDto
    {
        public Guid CompanyId { get; set; }
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }
    }
}
