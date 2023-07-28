namespace StockLinx.Core.Entities
{
    public class Consumable : BaseProduct
    {
        public int Quantity { get; set; }
        public string? ItemNo { get; set; }
        public string? ModelNo { get; set; }

        //Relates
        public ICollection<DeployedProduct> DeployedProducts { get; set; }
    }
}
