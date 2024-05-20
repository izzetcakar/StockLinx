using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public record PermissionDto : BaseRecord
    {
        public Guid CompanyId { get; set; }
        public Guid BranchId { get; init; }
        public Guid UserId { get; init; }
    }
}
