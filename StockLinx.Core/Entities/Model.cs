using StockLinx.Core.Entities;

namespace StockLinx.Core.Models
{
    public class Model : BaseEntity
    {
        public Guid CategoryId { get; set; }
        public Guid ImageId { get; set; }
        public Guid ManufacturerId { get; set; }
        public Category Category { get; set; }
        public Image Image { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public int? Eol { get; set; }
        public string ModelNo { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
    }
}
