using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class ComponentCheckInDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid ComponentId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
    }
}
