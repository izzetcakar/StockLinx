namespace StockLinx.Core.DTOs.Generic
{
    public class CompanyDto : BaseDto
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
    }
}
