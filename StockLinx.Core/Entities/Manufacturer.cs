using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Manufacturer : BaseEntity
    {
        public Guid ImageId { get; set; }
        public Image Image { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string SupportPhone { get; set; }
        public string SupportEmail { get; set; }
    }
}
