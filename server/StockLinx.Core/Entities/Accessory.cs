namespace StockLinx.Core.Entities
{
    public class Accessory : BaseProduct
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? SupplierId { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
        public DateTime? WarrantyDate { get; set; }

        //Relates
        public Manufacturer? Manufacturer { get; set; }
        public Supplier? Supplier { get; set; }
        public ICollection<DeployedProduct>? DeployedProducts { get; set; }
    }
}
