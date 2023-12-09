using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class ConsumableCheckInDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid ConsumableId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
    }
}
