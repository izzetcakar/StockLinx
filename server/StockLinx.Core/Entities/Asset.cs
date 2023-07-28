namespace StockLinx.Core.Entities
{

    public class Asset : BaseProduct
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? ModelId { get; set; }
        public string? TagNo { get; set; }
        public Manufacturer? Manufacturer { get; set; }
        public Model? Model { get; set; }

        //Relates
        public ICollection<DeployedProduct>? DeployedProducts { get; set;}
    }
}
