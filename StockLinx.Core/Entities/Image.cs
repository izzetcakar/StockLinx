using StockLinx.Core.Models;

namespace StockLinx.Core.Entities
{
    public class Image : BaseEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
    }
}
