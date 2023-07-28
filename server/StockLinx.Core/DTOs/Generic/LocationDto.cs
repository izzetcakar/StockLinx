namespace StockLinx.Core.DTOs.Generic
{
    public class LocationDto : BaseDto
    {
        public string? ImagePath { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string? State { get; set; }
        public string? Address { get; set; }
        public string? Address2 { get; set; }
        public string? ZipCode { get; set; }
        public string? Currency { get; set; }
        public string? Notes { get; set; }
    }
}
