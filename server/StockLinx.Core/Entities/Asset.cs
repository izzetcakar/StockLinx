namespace StockLinx.Core.Entities
{

    public class Asset : BaseProduct
    {
        public Guid? ModelId { get; set; }
        public string? ImagePath { get; set; }
        public string? TagNo { get; set; }
        public string? SerialNo { get; set; }

        //Relates
        public Model? Model { get; set; }
        public ICollection<DeployedProduct>? DeployedProducts { get; set; }
    }
}
