using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public enum CategoryType
    {
        Asset,
        Accessory,
        Component,
        Consumable
    }
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }
        public Guid? ImageId { get; set; }
        public Image? Image { get; set; }
    }
}
