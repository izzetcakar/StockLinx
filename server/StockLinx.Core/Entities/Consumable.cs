namespace StockLinx.Core.Entities
{
    public class Consumable : BaseProduct
    {
        public int? Tag { get; set; }
        public int? CheckinCounter { get; set; }
        public int? CheckoutCounter { get; set; }
        public string? ModelNo { get; set; }
        public string? ItemNo { get; set; }

        //Relates
        public ICollection<DeployedProduct> DeployedProducts { get; set;}
    }
}
