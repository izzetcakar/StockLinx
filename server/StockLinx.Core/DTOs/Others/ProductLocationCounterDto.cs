namespace StockLinx.Core.DTOs.Others
{
    public class ProductLocationCounterDto
    {
        public Guid LocationId { get; set; }
        public string LocationName { get; set; }
        public int ProductCount { get; set; }
        public int AssignedCount { get; set; }
        public int UserCount { get; set; }
    }
}
