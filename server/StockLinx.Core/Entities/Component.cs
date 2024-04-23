namespace StockLinx.Core.Entities
{
    public class Component : BaseProduct
    {
        public Guid? CategoryId { get; set; }
        public Guid? SupplierId { get; set; }
        public string? SerialNo { get; set; }
        public int Quantity { get; set; }

        //Relates
        public Category Category { get; set; }
        public Supplier? Supplier { get; set; }
        public ICollection<DeployedProduct>? DeployedProducts { get; set; }
    }
}
