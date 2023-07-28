namespace StockLinx.Core.Entities
{
    public class Model : BaseEntity
    {
        public Guid? ManufacturerId { get; set; }
        public Guid? CategoryId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ModelNo { get; set; }
        public string? Notes { get; set; }
        public Category? Category { get; set; }
        public Manufacturer? Manufacturer { get; set; }

        //Relates
        public ICollection<Asset> Assets { get; set; }
    }
}
