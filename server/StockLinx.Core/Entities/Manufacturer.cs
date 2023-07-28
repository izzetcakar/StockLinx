namespace StockLinx.Core.Entities
{
    public class Manufacturer : BaseEntity
    {
        public string Name { get; set; }
        public string? ImagePath { get; set; }
        public string? Website { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }

        //Relates
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Model> Models { get; set; }
    }
}
