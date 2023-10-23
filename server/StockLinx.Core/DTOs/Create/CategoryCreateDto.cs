using StockLinx.Core.Entities;

namespace StockLinx.Core.DTOs.Create
{
    public class CategoryCreateDto
    {
        public Guid BranchId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public CategoryType Type { get; set; }
    }
}
