namespace StockLinx.Core.Entities
{
    public class Component : BaseProduct
    {
        public Guid? CategoryId { get; set; }
        public string? SerialNo { get; set; }
        public int Quantity { get; set; }

        //Relates
        public Category? Category { get; set; }
        public ICollection<AssetProduct>? AssetProducts { get; set; }
    }
}
