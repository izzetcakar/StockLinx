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
        public ICollection<UserProduct>? UserProducts { get; set; }
        public ICollection<AssetProduct>? AssetProducts { get; set; }
    }
}
