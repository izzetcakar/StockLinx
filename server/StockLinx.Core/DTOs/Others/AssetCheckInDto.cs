using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class AssetCheckInDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid AssetId { get; set; }
        public string? Notes { get; set; }
        public DateTime AssignDate { get; set; }
    }
}
