namespace StockLinx.Core.DTOs.Others
{
    public class PermissionSyncDto
    {
        public Guid Id { get; set; }
        public Guid BranchId { get; set; }
        public Guid UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
