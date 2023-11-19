using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Create
{
    public class CategoryCreateDto : BaseCreateDto
    {
        public string Name { get; set; }
        public CategoryType Type { get; set; }
    }
}
