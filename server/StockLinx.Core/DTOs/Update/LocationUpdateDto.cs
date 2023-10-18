namespace StockLinx.Core.DTOs.Update
{
    public class LocationUpdateDto : BaseUpdateDto
    {
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
