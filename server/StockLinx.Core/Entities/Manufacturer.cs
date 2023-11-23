namespace StockLinx.Core.Entities
{
    public class Manufacturer : BaseEntity
    {
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? URL { get; set; }
        public string? SupportURL { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }
        public string? Notes { get; set; }

        //Relates
        public ICollection<Accessory>? Accessories { get; set; }
        public ICollection<Model>? Models { get; set; }
    }
}
