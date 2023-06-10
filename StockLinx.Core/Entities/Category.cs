using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
