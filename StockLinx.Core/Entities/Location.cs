namespace StockLinx.Core.Models
{
    public class Location : BaseEntity
    {
        public string City { get; set; }
        public string Country { get; set; }
        public Guid ImageId { get; set; }
    }
}
