namespace StockLinx.Core.DTOs.Generic
{
    public class CompanyDto : BaseDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string? ImagePath { get; set; }
    }
}
