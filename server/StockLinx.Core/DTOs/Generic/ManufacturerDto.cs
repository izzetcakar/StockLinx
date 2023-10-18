namespace StockLinx.Core.DTOs.Generic
{
    public class ManufacturerDto : BaseProductDto
    {
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? URL { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
    }
}
