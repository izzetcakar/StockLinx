namespace StockLinx.Core.DTOs.Generic
{
    public class PermissionDto : BaseDto
    {
        public Guid BranchId { get; set; }
        public Guid UserId { get; set; }
    }
}
