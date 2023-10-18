using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Generic
{
    public class CategoryDto : BaseDto
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }
        public string? ImagePath { get; set; }
    }
}
