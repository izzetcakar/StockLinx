using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Create
{
    public class CategoryCreateDto
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }
        public string? ImagePath { get; set; }
    }
}
