using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class AccessoryCheckInDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid AccessoryId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
    }
}
