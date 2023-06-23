namespace StockLinx.Core.DTOs.Update
{
    public class CompanyUpdateDto : BaseUpdateDto
    {
        public string Name { get; set; }
        public Guid? ImageId { get; set; }
    }
}
