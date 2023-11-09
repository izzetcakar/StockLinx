namespace StockLinx.Core.DTOs.Update
{
    public class ManufacturerUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? URL { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
    }
}
