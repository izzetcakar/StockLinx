namespace StockLinx.Core.DTOs.Others
{
    public class PermissionSyncDto
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
