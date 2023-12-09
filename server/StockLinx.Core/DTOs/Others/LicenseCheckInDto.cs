using StockLinx.Core.DTOs.Generic;

namespace StockLinx.Core.DTOs.Others
{
    public class LicenseCheckInDto : BaseDto
    {
        public Guid UserId { get; set; }
        public Guid LicenseId { get; set; }
        public DateTime AssignDate { get; set; }
        public string? Notes { get; set; }
    }
}
