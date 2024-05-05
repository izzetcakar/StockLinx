namespace StockLinx.Core.Entities
{
    public class Asset : BaseProduct
    {
        public Guid? ModelId { get; set; }
        public Guid ProductStatusId { get; set; }
        public string? ImagePath { get; set; }
        public string? SerialNo { get; set; }

        //Relates
        public Model? Model { get; set; }
        public ProductStatus ProductStatus { get; set; }
        public ICollection<UserProduct>? UserProducts { get; set; }
        public ICollection<AssetProduct>? AssetProducts { get; set; }
    }
}
