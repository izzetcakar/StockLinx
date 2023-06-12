using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Company : BaseEntity
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public Image? Image { get; set; }
    }
}
