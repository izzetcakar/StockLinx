namespace StockLinx.Core.DTOs.Create
{
    public class PermissionCreateDto : BaseCreateDto
    {
        public Guid BranchId { get; set; }
        public Guid UserId { get; set; }
    }
}
