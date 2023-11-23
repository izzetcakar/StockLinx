namespace StockLinx.Core.Entities
{
    public class Model : BaseEntity
    {
        public Guid CategoryId { get; set; }
        public Guid? ManufacturerId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ModelNo { get; set; }
        public string? Notes { get; set; }

        //Relates
        public FieldSet? FieldSet { get; set; }
        public Manufacturer? Manufacturer { get; set; }
        public Category Category { get; set; }
        public ICollection<Asset>? Assets { get; set; }
        public ICollection<ModelFieldData>? ModelFieldData { get; set; }
    }
}
