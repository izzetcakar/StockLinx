namespace StockLinx.Core.Entities
{
    public class ProductStatus : BaseEntity
    {
        public string Name { get; set; }
        public ProductStatusType Type { get; set; }

        // Relates
        public ICollection<Asset>? Assets { get; set; }
    }
}
