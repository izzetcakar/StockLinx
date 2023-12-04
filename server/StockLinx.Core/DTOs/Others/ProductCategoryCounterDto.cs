namespace StockLinx.Core.DTOs.Others
{
    public class ProductCategoryCounterDto
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ProductName { get; set; }
        public int ProductCount { get; set; }
    }
}
