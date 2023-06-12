namespace StockLinx.Core.Entities
{
    public class Component : BaseProduct
    {
        //Relates
        public ICollection<DeployedProduct> DeployedProducts { get; set; }
    }
}
