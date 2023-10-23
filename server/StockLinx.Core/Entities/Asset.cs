namespace StockLinx.Core.Entities
{

    public class Asset : BaseProduct
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? ModelId { get; set; }
        public string? TagNo { get; set; }

        //Relates
        public Manufacturer? Manufacturer { get; set; }
        public Model? Model { get; set; }
        public ICollection<DeployedProduct>? DeployedProducts { get; set; }
    }
}
