namespace StockLinx.Core.DTOs.Create
{
    public class ManufacturerCreateDto
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public string? Url { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
    }
}
