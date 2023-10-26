namespace StockLinx.Core.DTOs.Update
{
    public class PermissionUpdateDto : BaseUpdateDto
    {
        public Guid BranchId { get; set; }
        public Guid UserId { get; set; }
    }
}
