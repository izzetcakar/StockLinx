namespace StockLinx.Core.DTOs.Generic
{
    public class LocationDto : BaseDto
    {
        public string Name { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string Country { get; set; }
        public string? Address { get; set; }
        public string? Address2 { get; set; }
        public string? Zip { get; set; }
        public Guid? ParentId { get; set; }
        public double? Currency { get; set; }
        public Guid? ImageId { get; set; }
    }
}
