using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Supplier : BaseEntity
    {
        public Guid ImageId { get; set; }
        public Image Image { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Zip { get; set; }
        public string ContactName { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Url { get; set; }
        public string Notes { get; set; }
    }
}
