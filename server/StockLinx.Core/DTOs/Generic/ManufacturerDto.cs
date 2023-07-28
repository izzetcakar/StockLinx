namespace StockLinx.Core.DTOs.Generic
{
    public class ManufacturerDto : BaseProductDto
    {
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Website { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
    }
}
