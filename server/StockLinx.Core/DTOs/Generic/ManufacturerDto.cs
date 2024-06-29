using StockLinx.Core.DTOs.Update;

namespace StockLinx.Core.DTOs.Generic
{
    public class ManufacturerDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public string? URL { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
        public string? Notes { get; set; }
    }
}
