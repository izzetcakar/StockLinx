using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Update
{
    public record PermissionUpdateDto : BaseRecord
    {
        public Guid BranchId { get; init; }
        public Guid UserId { get; init; }
    }
}
