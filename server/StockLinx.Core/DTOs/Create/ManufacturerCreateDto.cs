namespace StockLinx.Core.DTOs.Create
{
    public class ManufacturerCreateDto : BaseCreateDto
    {
        public string Name { get; set; }
        public string? URL { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
        public string? Notes { get; set; }
    }
}
