namespace StockLinx.Core.Entities
{
    public class Manufacturer : BaseEntity
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
        public Image? Image { get; set; }
        public string? Url { get; set; }
        public string? SupportPhone { get; set; }
        public string? SupportEmail { get; set; }

        //Relates
        public ICollection<Accessory> Accessories { get; set; }
        public ICollection<Asset> Assets { get; set; }
        public ICollection<Model> Models { get; set; }
    }
}
