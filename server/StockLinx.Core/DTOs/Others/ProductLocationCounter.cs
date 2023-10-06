namespace StockLinx.Core.DTOs.Others
{
    public class ProductLocationCounter
    {
        public Guid LocationId { get; set; }
        public string LocationName { get; set; }
        public int ProductCount { get; set; }
        public int AssignedCount { get; set; }
    }
}
