namespace StockLinx.Core.DTOs.Generic
{
    public class PermissionDto : BaseDto
    {
        public Guid CompanyId { get; set; }
        public Guid BranchId { get; set; }
        public Guid UserId { get; set; }
    }
}
