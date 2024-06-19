using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public record PermissionDto : BaseRecord
    {
        public Guid CompanyId { get; set; }
        public Guid UserId { get; init; }
    }
}
