namespace StockLinx.Core.Entities
{
    public class Component : BaseProduct
    {
        public int Quantity { get; set; }
        //Relates
        public ICollection<DeployedProduct> DeployedProducts { get; set; }
    }
}
