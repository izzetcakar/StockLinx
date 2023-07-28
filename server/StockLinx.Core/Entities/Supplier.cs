namespace StockLinx.Core.Entities
{
    public class Supplier : BaseEntity
    {
        public Guid? LocationId { get; set; }
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? ContactName { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? Website { get; set; }
        public string? Fax { get; set; }
        public string? Notes { get; set; }
        public Location? Location { get; set; }

        //Relates
        public ICollection<Accessory> Accessories { get; set; }
    }
}
